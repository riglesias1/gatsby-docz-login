# -*- coding: utf-8; -*-
import json
from flask import request
from main.controller.components import response_service
from main.services.collection_service import CollectionService
from flask_restx import Resource, Namespace, fields


user_controller = Namespace('Users', 'Endpoint para lista de Usuarios', '/api')
model_user = user_controller.model('User', {
    'email': fields.String,
    'roles': fields.String,
})


@user_controller.route('/databases')
class DatabaseApi(Resource):

    def get(self):
        instances = CollectionService().get_collections()
        response = {'databases': instances}

        return response_service.list_of_users(response)


@user_controller.route('/whitelist/<collection>')
class WhitelistApi(Resource):

    def get(self, collection: str):
        instance = CollectionService(collection)

        if not instance.collection_exist():
            return response_service.collection_not_found()

        response = instance.get_users()
        
        del response['_id']

        return response_service.list_of_users(response)


@user_controller.route('/users/<collection>/<email>')
class UsersApi(Resource):

    def get(self, collection: str, email: str):
        instance = CollectionService(collection)

        if not instance.collection_exist():
            return response_service.collection_not_found()

        response = instance.get_a_user(email)

        if not response:
            return response_service.email_not_found()

        return response_service.list_of_users(response)

    @user_controller.expect(model_user)
    def post(self, collection: str, email: str):
        updated_data = request.get_json()
        instance = CollectionService(collection)

        if not instance.collection_exist():
            return response_service.collection_not_found()

        try:
            updated_data['roles']
            updated_data['email']
        except Exception as error:
            return response_service.structure_error(error)

        if updated_data['email'] != email:
            instance_data = instance.get_users()

            del instance_data['_id']
            user = email.split('@')[0]
            try:
                if instance_data[user]['email'] == email:
                    del instance_data[user]
                else:
                    raise
            except:
                return response_service.email_not_found()
            instance.update_instance(email, instance_data)
            email = updated_data['email']

        response = instance.update_user(email, updated_data)

        if not response:
            return response_service.email_not_found()

        return response_service.list_of_users(response)

    def delete(self, collection: str, email: str):
        instance = CollectionService(collection)

        if not instance.collection_exist():
            return response_service.collection_not_found()

        updated_data = instance.get_users()
        del updated_data['_id']
        user = email.split('@')[0]

        try:
            del updated_data[user]
        except:
            return response_service.email_not_found()

        instance.update_instance(email, updated_data)

        return response_service.list_of_users(email)
