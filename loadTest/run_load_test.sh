#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker run --rm -i --network=ivanjh_default grafana/k6 run - <$DIR/k6script.js
