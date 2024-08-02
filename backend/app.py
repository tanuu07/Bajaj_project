from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app
@app.route('/bfhl', methods=['POST'])
def bfhl():
    if request.method == 'POST':
        data = request.get_json().get('data', [])
        full_name = "Tanu Chauhan"  
        dob = "16092002" 
        user_id = f"{full_name}_{dob}"
        email = "tr7397@srmist.edu.in"  
        roll_number = "RA2111030010155" 

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        highest_alphabet = max(alphabets, key=str.upper) if alphabets else ""

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }

        return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    response = {
        "operation_code": 1
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
