from flask_pymongo import PyMongo

class Connector():
    def __init__(self, host, port, user, password, database):
        self._host = host
        self._port = port
        self._user =  user
        self._password = password
        self._database = database

    def connection_string(self):
        credentials = f"{self._user}:{self._password}@" if self._user and self._password else ''
        
        return f"mongodb://{credentials}{self._host}:{self._port}/{self._database}"

    def get_connection(self, app):
        app.config["MONGO_URI"] = Connector.connection_string(self)
        return PyMongo(app)
