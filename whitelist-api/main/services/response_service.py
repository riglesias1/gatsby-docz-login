from flask import jsonify
import json


class ResponseService:

    @staticmethod
    def list_of_users(instance: dict):

        response = jsonify(
            {
                'message': 'Instance generated successfully',
                'response': instance,
                'total': len(instance),
                'status code': 200
            }
        )
        response.status_code = 200
        response.mimetype = 'application/json'

        return response

    @staticmethod
    def structure_error(error):
        response = jsonify({'message': 'Structure error',
                           'response': str(error), 'status code': 400})
        response.status_code = 400
        response.mimetype = 'application/json'
        return response

    @staticmethod
    def collection_not_found():
        response = jsonify(
            {'message': 'The given collection was not found in the DB', 'response': None, 'status code': 404})
        response.status_code = 404
        response.mimetype = 'application/json'
        return response

    @staticmethod
    def email_not_found():
        response = jsonify(
            {'message': 'The given email was not found in the DB', 'response': None, 'status code': 404})
        response.status_code = 404
        response.mimetype = 'application/json'
        return response

    @staticmethod
    def custom_response(status_code=404, message=None, response=None):
        response = jsonify(
            {'message': message, 'response': response, 'status code': status_code})
        response.status_code = status_code
        response.mimetype = 'application/json'
        return response
