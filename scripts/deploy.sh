#!/bin/bash

BLUEMIX_API_KEY_FILE="deploy.production"

source $BLUEMIX_API_KEY_FILE

BLUEMIX_API_URL="https://api.ng.bluemix.net"
BLUEMIX_ORG="WatsonPlatformServices"
BLUEMIX_SPACE="demos"
BLUEMIX_APP_NAME="discovery-news-demo-staging"
BLUEMIX_MAINIFEST_FILE="manifest.$1.yml"

cf login -a $BLUEMIX_API_URL -o $BLUEMIX_ORG -s $BLUEMIX_SPACE -u apikey -p $BLUEMIX_API_KEY

if [ "$1" == "production" ]; then
  BLUEMIX_APP_NAME="discovery-news-demo"
fi

cf zero-downtime-push $BLUEMIX_APP_NAME -f $BLUEMIX_MAINIFEST_FILE
