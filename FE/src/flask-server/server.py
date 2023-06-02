from flask import Flask, jsonify
import random
from data import responses
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/response/<message>")
def getResponse(message):
    message = str(message).lower().replace("?", "")
    if message in responses:
        return jsonify({"msg": random.choice(responses[message])})
    else:
        return jsonify({"msg": random.choice(responses["default"])})

app.run(debug=True)