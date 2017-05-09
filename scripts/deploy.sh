#!/bin/bash

BLUEMIX_API_KEY_FILE="deploy.production"

source $BLUEMIX_API_KEY_FILE

BLUEMIX_API_URL="https://api.ng.bluemix.net"
BLUEMIX_ORG="WatsonPlatformServices"
BLUEMIX_SPACE="demos"

./cf login -a $BLUEMIX_API_URL -o $BLUEMIX_ORG -s $BLUEMIX_SPACE -u apikey -p $BLUEMIX_API_KEY
./cf zero-downtime-push discovery-news-demo -f manifest.yml
