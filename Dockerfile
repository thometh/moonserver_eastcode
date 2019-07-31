FROM node:8

EXPOSE 3030
EXPOSE 3000

WORKDIR /node/lamassu-server

COPY ./docker/install.sh /usr/local/bin
COPY ./docker/migrations.sh /usr/local/bin
COPY ./docker/run.sh /usr/local/bin

COPY . .

RUN install.sh

ENTRYPOINT ["migrations.sh"];

CMD [ "run.sh" ]
