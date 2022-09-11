# -*- coding: utf-8; -*-
from  main.database.connections import Connector
import os

def database_connection(app):
    
    try:
        mongo_connection = Connector(
            host = os.getenv('MONGO_HOST'),
            port = int(os.getenv('MONGO_PORT',27017)),
            user = os.getenv('MONGO_USER'),
            password = os.getenv('MONGO_PASSWORD'),
            database = os.getenv('MONGO_DATABASE')
        ).get_connection(app)

        return mongo_connection
    except Exception:
        raise