from main.database.dao import CollectionDAO


class CollectionService:

    def __init__(self, collection=''):
        self.collection_name = collection
        self.collection_dao = CollectionDAO(collection)

    def get_users(self):
        return self.collection_dao.get_all()

    def get_a_user(self, email):
        return self.collection_dao.get_by_email(email)

    def update_user(self, email, updated_data):
        return self.collection_dao.update_by_email(email, updated_data)

    def update_instance(self, email, updated_data):
        return self.collection_dao.update_all_instance(email, updated_data)

    def get(self):
        return self.collection_dao.database

    def get_collections(self):
        return self.collection_dao.collection_names()

    def collection_exist(self):
        if self.collection_name in self.get_collections():
            if not self.collection_dao.get_all():
                self.collection_dao.persistent_class().insert_one({})
            return True
        else:
            return False
