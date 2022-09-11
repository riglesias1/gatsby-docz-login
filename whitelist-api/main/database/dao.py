from main.database.connect import database_connection
from abc import ABC, abstractmethod
from flask import Flask
import bson


database = database_connection(Flask(__name__)).db


class AbstractDAO(ABC):

    def persist(self, an_object):
        return self.persistent_class().save(an_object)

    def get_all(self):
        return self.persistent_class().find_one()

    def get_by_email(self, an_email):
        user = an_email.split('@')[0].replace('.', '')
        key = user + '.email'
        consult = self.persistent_class().find_one({key: an_email})
        return consult[user] if consult else consult

    def update_by_email(self, an_email, updated_data):
        user = an_email.split('@')[0].replace('.', '')
        data = {"$set": {user: updated_data}}
        self.persistent_class().update_one({}, data)
        updated = self.get_by_email(updated_data['email'])
        return updated

    def update_all_instance(self, an_email, updated_data):
        user = an_email.split('@')[0].replace('.', '')
        key = user + '.email'
        self.persistent_class().replace_one(
            {key: an_email}, updated_data, True)

    @abstractmethod
    def persistent_class(self):
        raise NotImplementedError("Implement this method on all subclasses.")


class CollectionDAO(AbstractDAO):

    def __init__(self, collection):
        self.collection = collection
        if collection:
            self.database = database[collection]

    def collection_names(self):
        return database.list_collection_names()

    def persistent_class(self):
        return self.database
