from main.controller.user_controller import *


def initialize_routes(api):

    # Definimos espacios de trabajo
    api.add_namespace(user_controller)

    # Rutas
    user_controller.add_resource(DatabaseApi, '/databases')
    user_controller.add_resource(WhitelistApi, '/whitelist/<collection>')
    user_controller.add_resource(UsersApi, '/users/<collection>/<email>')
