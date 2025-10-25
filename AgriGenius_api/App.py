from flask import Flask, request, jsonify
import joblib
import numpy as np
import firebase_admin
from firebase_admin import credentials, firestore
import traceback
from flask_cors import CORS


app = Flask(__name__)
CORS(app)



# Initialize Firebase
cred = credentials.Certificate("firebase-adminsdk.json")  # Ensure this file exists and is correctly named
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load models and encoders
yield_model = joblib.load('yield_model.pkl')
crop_model = joblib.load('crop_model.pkl')
soil_encoder = joblib.load('soil_label_encoder.pkl')
crop_label_encoder = joblib.load('crop_label_encoder.pkl')

# Yield Prediction Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)

        rainfall = float(data['rainfall'])
        temperature = float(data['temperature'])
        soil = data['soil']
        land = float(data['land'])

        # Encode soil type
        soil_encoded = soil_encoder.transform([soil])[0]

        # Predict yield
        yield_prediction = yield_model.predict([[rainfall, temperature, soil_encoded, land]])[0]
        print("Yield prediction complete:", yield_prediction)

        result = {
            "predicted_yield": round(yield_prediction, 2)
        }

        print("Final result to return:", result)
        return jsonify(result)

    except Exception as e:
        print("ERROR during prediction:", str(e))
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

# Crop Suggestion Route
@app.route('/suggest-crop', methods=['POST'])
def suggest_crop():
    try:
        data = request.get_json()
        print("Received data:", data)

        rainfall = float(data['rainfall'])
        temperature = float(data['temperature'])
        soil = data['soil']
        land = float(data['land'])

        # Encode soil type
        soil_encoded = soil_encoder.transform([soil])[0]

        # Predict crop
        crop_prediction = crop_model.predict([[rainfall, temperature, soil_encoded, land]])[0]
        crop_name = crop_label_encoder.inverse_transform([crop_prediction])[0]

        result = {
            "suggested_crop": crop_name
        }

        print("Crop suggestion result:", result)
        return jsonify(result)

    except Exception as e:
        print("ERROR during crop suggestion:", str(e))
        return jsonify({"error": "Crop suggestion failed", "details": str(e)}), 500


@app.route('/submit_idea', methods=['POST'])
def submit_idea():
    try:
        data = request.get_json()
        print("Received idea submission:", data)

        idea = {
            'title': data['title'],
            'description': data['description'],
            'author': data['author'],
            'timestamp': firestore.SERVER_TIMESTAMP
        }

        db.collection('innovative_ideas').add(idea)
        return jsonify({"message": "Idea submitted successfully"}), 200

    except Exception as e:
        print("ERROR while submitting idea:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/get_ideas', methods=['GET'])
def get_ideas():
    try:
        print("\n📥 Fetching ideas from Firestore...")
        ideas_ref = db.collection('innovative_ideas').order_by('timestamp', direction=firestore.Query.DESCENDING)
        docs = ideas_ref.stream()

        ideas = []
        for doc in docs:
            idea = doc.to_dict()
            print(f"✅ Idea fetched: {idea}")  # Debug print
            idea['id'] = doc.id
            ideas.append(idea)

        print(f"🧠 Total ideas fetched: {len(ideas)}")
        return jsonify(ideas), 200

    except Exception as e:
        print("❌ ERROR while fetching ideas:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("AgriGenius ML API is live!")
    app.run(host='0.0.0.0', port=5000)
