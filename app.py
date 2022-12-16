from absl import app, logging
from flask import Flask, request, Response, jsonify, send_from_directory, abort, render_template
import os
# Importing libs

# Initialize Flask application
app = Flask(__name__,template_folder="templates")


#API that convert text image to voice

# API that returns homepage
@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True, host = '0.0.0.0', port=5000)