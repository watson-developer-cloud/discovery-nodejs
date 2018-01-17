# Discovery Demo [![Build Status](https://travis-ci.org/watson-developer-cloud/discovery-nodejs.svg?branch=master)](https://travis-ci.org/watson-developer-cloud/discovery-nodejs)


Use the IBM Watson [Discovery][service_url] service to add a cognitive search and content analytics engine to your applications to identify patterns, trends and actionable insights that drive better decision-making.

![Demo](readme-images/new-demo.gif)

Demo: https://discovery-news-demo.ng.bluemix.net/

## Getting started

To deploy this repository as-is, click the "Deploy to IBM Cloud" button

[![Deploy to IBM Cloud][deploy_button_url]][deploy_url]

When this button is clicked, it will begin the process of creating a deployment toolchain based on the master branch of the repo into Bluemix and you will have to modify the application name to the name of the host you want to put it at. The default will get mapped to {organization/user}-{repo_name}-{timestamp}.

After creating the toolchain, you must either run the deployment script as part of the [Continuous Delivery](https://www.ibm.com/devops/method/content/deliver/practice_continuous_delivery/) which will create the service for you, or refer to the [Setup a IBM Watson Discovery Service](#setup-a-ibm-watson-discovery-service) section below to create it manually.

For more details about developing applications that use Watson Developer Cloud services in Bluemix, see [Getting started with Watson Developer Cloud and Bluemix][getting_started].

## Development

### Setup a IBM Watson Discovery Service

1. You need a Bluemix account. If you don't have one, [sign up][sign_up].

1. Download and install the [Cloud-foundry CLI][cloud_foundry] tool if you haven't already.

1. Connect to Bluemix with the command line tool.

   ```sh
   cf api https://api.ng.bluemix.net
   cf login
   ```

1. Create and retrieve service keys to access the [Discovery][service_url] service:

   ```none
   cf create-service discovery standard Discovery-Demo
   cf create-service-key Discovery-Demo myKey
   cf service-key Discovery-Demo myKey
   ```

1. Create an `.env` file in the root directory by copying the sample `.env.example` file using the following command:

   ```none
   cp .env.example .env
   ```
   Update the `.env` with your service instance information from step 4

   The `.env` file will look something like the following:

   ```none
   DISCOVERY_USERNAME=<username>
   DISCOVERY_PASSWORD=<password>
   ```

### Run the demo locally

1. Install the needed application dependencies with this command:

   ```none
   npm install
   ```

1. Start the application locally:

   ```none
   npm start
   ```


1. Point your browser to [http://localhost:3000](http://localhost:3000).

You may build the optimized production build by running `npm run build`. Then you only require to run the `node server.js` to see your code hosted at [http://localhost:5000](http://localhost:5000)

### Run tests

#### Unit tests
Run unit tests with `npm run test-unit`, then `a` to run all tests. See the output for more info.

#### Integration tests
First you have to make sure your code is built: `npm run build`

Then run integration tests with: `npm run test-integration-runner`

## Troubleshooting

* The main source of troubleshooting and recovery information is the Bluemix log. To view the log, run this command:

  ```sh
  cf logs <your application name> --recent
  ```

* For more details about the service, see the [documentation][docs] for the Discovery service.

----

### Directory structure

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

# Privacy Notice

Sample web applications that include this package may be configured to track deployments to [IBM Cloud](https://www.bluemix.net/) and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM/metrics-collector-service) service on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Application GUID (`application_id`)
* Application instance index number (`instance_index`)
* Space ID (`space_id`) or OS username
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Cloud Foundry API (`cf_api`)
* Labels of bound services
* Number of instances for each bound service and associated plan information
* Metadata in the repository.yaml file

This data is collected from the `package.json` and `repository.yaml` file in the sample application and the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Cloud and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Cloud to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

If you want to disable deployment tracking, follow these steps:

- Set the environment variable `DEMO_DEPLOY` to `1` OR
- remove the `tracker.track();` line in the `./server.js` file

[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: https://www.ibm.com/watson/developercloud/doc/common/index.html
[service_url]: http://www.ibm.com/watson/developercloud/discovery.html
[docs]: http://www.ibm.com/watson/developercloud/doc/discovery/index.html
[sign_up]: https://console.ng.bluemix.net/registration/
[deploy_button_url]: https://metrics-tracker.mybluemix.net/stats/77edd7e5d6ad4cedf9bc7afaddc29f05/button.svg
[deploy_url]: https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/discovery-nodejs.git
