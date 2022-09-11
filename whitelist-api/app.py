# -*- coding: utf-8; -*-
import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_restx import Api
from datetime import datetime
from main.blueprint.routes import initialize_routes
from main.database.connect import database_connection


# App instance
app = Flask(__name__)
api = Api(app,
          title='User management API',
          version='v0.1')

CORS(app)
load_dotenv()
app.url_map.strict_slashes = False
app.config['JSON_SORT_KEYS'] = False

initialize_routes(api)
database = database_connection(app)


@app.route('/home')
@app.route('/alive')
def home():
    return {
        'api': 'User management',
        'Documentacion': '/',
        'Datetime': datetime.now()
    }


if __name__ == '__main__':
    app.run(port=int(os.getenv('API_PORT')), host=os.getenv(
        'API_HOST'), debug=os.getenv('DEBUG_MODE'))
