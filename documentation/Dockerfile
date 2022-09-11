FROM node:lts-alpine3.14

# Build app_documentacion
WORKDIR /app

COPY ./.env ./
COPY ./documentation ./
RUN rm -rf node_modules .docz yarn.lock .docz/.cache

RUN yarn
RUN yarn build
RUN yarn telemetry

# Compila el sitio y Build con la ruta de .docz/public
# CMD ["yarn", "dev"] # Para desarrollo, se visualizan cambios en tiempo real
CMD ["yarn", "serve"] # Para producción