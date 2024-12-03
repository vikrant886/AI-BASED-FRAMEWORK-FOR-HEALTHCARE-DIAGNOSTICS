import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # To handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Make sure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define a route for file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to the server
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    # Process the file with your ML model
    # Replace this with your model code
    prediction = mock_predict(filepath)

    return jsonify({'prediction': prediction})

# Example mock prediction function (replace with your ML model's inference code)
def mock_predict(filepath):
    # Load the file, process it, and return a prediction
    return "Prediction result based on file content"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
