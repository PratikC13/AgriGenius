# AgriGenius

AgriGenius is a mobile-first agricultural assistant that helps farmers plan and improve crop yields using machine learning, smart suggestions, and community-shared innovations. The project contains a React Native app, a Python backend, and a Jupyter notebook for ML model development.

## Project Structure

- `AgriGenius/` — React Native mobile app (screens, assets, firebase integration)
- `AgriGenius_api/` — Python backend (API, Firebase Admin SDK)
- `ML_Model/` — Dataset and Jupyter notebook used to build the yield prediction model

## Four Primary Features 

### 1) Yield Prediction
- **What it does**: Predicts expected crop yield for a farmer's field for a given season
- **Inputs**: 
  - Crop type
  - Historical yield data (if available)
  - Soil parameters
  - Location
  - Planting date
  - Weather data (optional)
- **Outputs**: 
  - Estimated yield (tonnes/hectare)
  - Confidence interval
  - Recommendations for improvement
- **How it works**: 
  - Uses ML model trained on `agri_dataset.csv`
  - Considers historical data and environmental factors
  - Provides data-driven yield forecasts
- **Where to find**: `PredictYieldScreen.js`

### 2) Crop Suggestion
- **What it does**: Recommends suitable crops based on local conditions
- **Inputs**:
  - Soil type and quality
  - Available irrigation
  - Season/planting window
  - Land size
  - Farmer preferences
- **Outputs**:
  - Ranked list of suitable crops
  - Success probability for each crop
  - Care instructions
- **How it works**:
  - Analyzes soil and climate compatibility
  - Uses ML to rank crop suitability
  - Provides practical farming guidance
- **Where to find**: `SuggestCropScreen.js`

### 3) Share Innovation
- **What it does**: Allows farmers to share agricultural techniques and discoveries
- **Inputs**:
  - Innovation title
  - Detailed description
  - Photos/images (optional)
  - Tags/categories
  - Author information
- **Outputs**:
  - Published innovation post
  - Confirmation of submission
- **How it works**:
  - Uses Firebase for storage
  - Supports image uploads
  - Makes content available to community
- **Where to find**: `SubmitInnovationScreen.js`

### 4) View Innovations
- **What it does**: Browse and search community-shared farming innovations
- **Inputs**:
  - Search terms (optional)
  - Category filters
  - Sort preferences
- **Outputs**:
  - List of relevant innovations
  - Detailed view of selected items
  - Associated images and tips
- **How it works**:
  - Fetches data from Firebase
  - Supports search and filtering
  - Shows full innovation details
- **Where to find**: `ViewInnovationsScreen.js`

## Quick Setup

1. **Frontend (React Native)**
```powershell
cd AgriGenius
npm install
npx react-native start
```

2. **Backend (Python)**
```powershell
cd AgriGenius_api
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python App.py
```

## Configuration

Important: Firebase configuration files are excluded from git:
- Create `AgriGenius/firebase.js` for mobile app Firebase config
- Create `AgriGenius_api/firebase-adminsdk.json` for backend Firebase Admin

## API Endpoints

- Yield Prediction: `POST /predict`
- Crop Suggestion: `POST /suggest-crops`
- Share Innovation: `POST /innovations`
- View Innovations: `GET /innovations`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.
