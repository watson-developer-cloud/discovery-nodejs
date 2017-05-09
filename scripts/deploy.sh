#!/bin/bash

BLUEMIX_API_KEY_FILE="deploy.production"

source $BLUEMIX_API_KEY_FILE

BLUEMIX_API_URL="https://api.ng.bluemix.net"
BLUEMIX_ORG="WatsonPlatformServices"
BLUEMIX_SPACE="demos"
BLUEMIX_APP_NAME="discovery-news-demo-staging"
BLUEMIX_MAINIFEST_FILE="manifest.$1.yml"

wget 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github' -qO cf-linux-amd64.tgz && tar -zxvf cf-linux-amd64.tgz && rm cf-linux-amd64.tgz
./cf install-plugin -f https://github.com/contraband/autopilot/releases/download/0.0.3/autopilot-linux

./cf login -a $BLUEMIX_API_URL -o $BLUEMIX_ORG -s $BLUEMIX_SPACE -u apikey -p $BLUEMIX_API_KEY

if [ "$1" == "production" ]; then
  BLUEMIX_APP_NAME="discovery-news-demo"
fi

./cf zero-downtime-push $BLUEMIX_APP_NAME -f $BLUEMIX_MAINIFEST_FILE
