<h1 align="center" style="border-bottom: none;">🔎 Discovery Demo </h1>
<h3 align="center">Use the IBM Watson Discovery service to add a cognitive search and content analytics engine to your applications to identify patterns, trends and actionable insights that drive better decision-making.</h3>
<p align="center">
  <a href="http://travis-ci.org/watson-developer-cloud/discovery-nodejs">
    <img alt="Travis" src="https://travis-ci.org/watson-developer-cloud/discovery-nodejs.svg?branch=master">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>
</p>

![demo](readme-images/new-demo.gif)

Demo: https://discovery-news-demo.ng.bluemix.net/

## Prerequisites

1. Sign up for an [IBM Cloud account](https://console.bluemix.net/registration/).
1. Download the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview).
1. Create an instance of the Discovery service and get your credentials:
    - Go to the [Discovery](https://console.bluemix.net/catalog/services/discovery) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `apikey` value, or copy the `username` and `password` values if your service instance doesn't provide an `apikey`.
    - Copy the `url` value.

## Configuring the application

1. In the application folder, copy the *.env.example* file and create a file called *.env*

    ```
    cp .env.example .env
    ```

2. Open the *.env* file and add the service credentials that you obtained in the previous step.

    Example *.env* file that configures the `apikey` and `url` for a Discovery service instance hosted in the US East region:

    ```
    DISCOVERY_IAM_APIKEY=X4rbi8vwZmKpXfowaS3GAsA7vdy17Qh7km5D6EzKLHL2
    DISCOVERY_URL=https://gateway-wdc.watsonplatform.net/discovery/api
    ```

    - If your service instance uses `username` and `password` credentials, add the `DISCOVERY_USERNAME` and `DISCOVERY_PASSWORD` variables to the *.env* file.

    Example *.env* file that configures the `username`, `password`, and `url` for a Discovery service instance hosted in the Sydney region:

    ```
    DISCOVERY_USERNAME=522be-7b41-ab44-dec3-g1eab2ha73c6
    DISCOVERY_PASSWORD=A4Z5BdGENrwu8
    DISCOVERY_URL=https://gateway-syd.watsonplatform.net/discovery/api
    ```

<!-- **ADD ANY APP-SPECIFIC CONFIGURATION INSTRUCTIONS HERE** -->

## Running locally

1. Install the dependencies

    ```
    npm install
    ```

1. Build the application

    ```
    npm run build
    ```

1. Run the application

    ```
    npm start
    ```

1. View the application in a browser at `localhost:3000`

## Deploying to IBM Cloud as a Cloud Foundry Application

1. Build the application

    ```
    npm run build
    ```

1. Login to IBM Cloud with the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview)

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space.

    ```
    ibmcloud target --cf
    ```

1. Edit the *manifest.yml* file. Change the **name** field to something unique. For example, `- name: my-app-name`.
1. Deploy the application

    ```
    ibmcloud app push
    ```

1. View the application online at the app URL, for example: https://my-app-name.mybluemix.net


## Tests

#### Unit tests
Run unit tests with `npm run test-unit`, then `a` to run all tests. See the output for more info.

#### Integration tests
First you have to make sure your code is built: `npm run build`

Then run integration tests with: `npm run test-integration-runner`

## Directory structure

```none
.
├── app.js                      // express routes
├── config                      // express configuration
│   ├── error-handler.js
│   ├── express.js
│   └── security.js
├── package.json
├── public                      // static resources
├── server.js                   // entry point
├── test                        // integration tests
└── src                         // react client
    ├── __test__                // unit tests
    └── index.js                // app entry point
```

## License

  This sample code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

  See [CONTRIBUTING](.github/CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[getting_started]: https://www.ibm.com/watson/developercloud/doc/common/index.html
[docs]: http://www.ibm.com/watson/developercloud/doc/discovery/index.html
[sign_up]: https://console.ng.bluemix.net/registration/
