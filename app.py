from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib  # Use this if you saved your ML model with joblib or pickle
app = Flask(__name__)

# Load your pre-trained model
# Replace 'model.pkl' with the actual file path of your trained model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Handle file uploads
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    try:
        # Assuming the input file is CSV
        data = pd.read_csv(file)
        predictions = model.predict(data)
        results = predictions.tolist()
        return jsonify({'predictions': results})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict_manual', methods=['POST'])
def predict_manual():
    # Handle manual input
    data = request.get_json()

    try:
        readings = np.array(data['readings']).reshape(1, -1)
        prediction = model.predict(readings)
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
