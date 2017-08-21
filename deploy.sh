#!/bin/bash
#set -x
#CF_TRACE=true

# Compute a unique app name using the reserved CF_APP name (configured in the
# deployer or from the manifest.yml file) and the build number

export TEMP_APP_NAME="discovery-news-demo-crawl-date"

# write out manifest.yml
echo "Writing manifest.yml..."

cat > ./manifest.yml <<EOL
name: ${TEMP_APP_NAME}
instances: 1
memory: 512M
command: npm start
services:
  - Discovery-Demo
env:
  DEMO_DEPLOY: 1

EOL

echo "Manifest file written"

cat ./manifest.yml

echo "Pushing new app:$TEMP_APP_NAME"
cf push $TEMP_APP_NAME
export TEMP_APP_URL="https://${TEMP_APP_NAME}.${ROUTE_DOMAIN}"

echo "##############################################################"
echo "Deployed new app $TEMP_APP_NAME"
echo "on temporary route: $TEMP_APP_URL"
echo "##############################################################"

# View logs
#cf logs "${TEMP_APP_NAME}" --recent
