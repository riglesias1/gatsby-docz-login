FROM python:3.10-alpine3.15

# set working directory
WORKDIR /home/app

RUN apk add nano

COPY ./.env ./
COPY ./whitelist-api/requirements.txt ./
RUN pip install -r requirements.txt

RUN adduser -D app
RUN addgroup docker
RUN chown -R app:docker .

EXPOSE ${API_PORT}
CMD [ "python3",  "app.py"]