#!/bin/bash

docker compose down --volumes --remove-orphans

if [ "$#" -eq 1 ]; then
    SCALE=$1
    echo "Scaling API service to $SCALE instances."
    docker compose -p 'ivanjh' up -d --force-recreate --build --scale api=$SCALE
else
    echo "Starting services with default scaling."
    docker compose -p 'ivanjh' up -d --force-recreate --build
fi

docker compose -p 'ivanjh' logs -f