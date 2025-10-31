# AgriGenius

AgriGenius is a comprehensive agricultural mobile application that combines modern technology with farming practices to help farmers make better decisions and improve their yield.

## Project Structure

The project consists of three main components:

### 1. Mobile Application (AgriGenius/)
- React Native mobile app
- Features user authentication
- Multiple screens for different functionalities
- Firebase integration for data management

### 2. Backend API (AgriGenius_api/)
- Python-based backend server
- Firebase Admin SDK integration
- Handles API requests from the mobile app

### 3. Machine Learning Model (ML_Model/)
- Crop yield prediction model
- Dataset: agri_dataset.csv
- Jupyter Notebook for model development

## Features

1. **User Authentication**
   - Login functionality
   - User registration/signup
   - Profile management

2. **Crop Management**
   - Yield prediction
   - Crop suggestions based on conditions
   - Smart farming recommendations

3. **Innovation Platform**
   - Submit agricultural innovations
   - View shared innovations
   - Community knowledge sharing

## Screens

- `HomeScreen`: Main dashboard
- `LoginScreen`: User authentication
- `SignupScreen`: New user registration
- `PredictYieldScreen`: Crop yield predictions
- `SuggestCropScreen`: Intelligent crop suggestions
- `SubmitInnovationScreen`: Share farming innovations
- `ViewInnovationsScreen`: Browse community innovations
- `ProfileScreen`: User profile management

## Technologies Used

- **Frontend**:
  - React Native
  - Firebase Authentication
  - JavaScript/JSX

- **Backend**:
  - Python
  - Firebase Admin SDK
  - RESTful API

- **Machine Learning**:
  - Python
  - Jupyter Notebook
  - Data Analysis Libraries

## Getting Started

1. Clone the repository
2. Set up the development environment:
   - Install Node.js and npm
   - Set up React Native environment
   - Install Python dependencies
   - Configure Firebase credentials

3. Install dependencies:
```bash
# Mobile App
cd AgriGenius
npm install

# Backend
cd AgriGenius_api
pip install -r requirements.txt
```

4. Run the application:
```bash
# Start the mobile app
cd AgriGenius
npm start

# Start the backend server
cd AgriGenius_api
python App.py
```

## Contributing

Feel free to submit issues and enhancement requests!