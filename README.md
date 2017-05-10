# Discovery Demo [![Build Status](https://travis-ci.org/watson-developer-cloud/discovery-nodejs.svg?branch=master)](https://travis-ci.org/watson-developer-cloud/discovery-nodejs)


Use the IBM Watson [Discovery][service_url] service to add a cognitive search and content analytics engine to your applications to identify patterns, trends and actionable insights that drive better decision-making.

![Demo](readme-images/new-demo.gif)

Demo: https://discovery-news-demo.mybluemix.net/

## Getting started

1. You need a Bluemix account. If you don't have one, [sign up][sign_up].

1. Download and install the [Cloud-foundry CLI][cloud_foundry] tool if you haven't already.

1. Connect to Bluemix with the command line tool.

  ```sh
  cf api https://api.ng.bluemix.net
  cf login
  ```

1. Create and retrieve service keys to access the [Discovery][service_url] service:

  ```none
  cf create-service discovery standard my-discovery-service
  cf create-service-key my-discovery-service myKey
  cf service-key my-discovery-service myKey
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

1. Install the needed application dependencies with this command:

  ```none
  npm install
  ```

1. Start the application locally:

  ```none
  npm start
  ```

1. Point your browser to [http://localhost:3000](http://localhost:3000).

1. Create a `manifest.yml` in the project directory that looks like this:
   ```yml
   name: <your application name>
   command: npm start
   services:
     - my-discovery-service
   ```

1. When you're ready, push the application to Bluemix and bind your Discovery service with:

  ```none
  cf push <your application name>
  ```

After completing these steps, you are ready to test your application. Start a browser and enter the URL of your application.

            <your application name>.mybluemix.net


For more details about developing applications that use Watson Developer Cloud services in Bluemix, see [Getting started with Watson Developer Cloud and Bluemix][getting_started].


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
├── test                        // tests
└── views                       // react components
```

## License

  This sample code is licensed under Apache 2.0.

## Contributing

  See [CONTRIBUTING](.github/CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Privacy Notice

Sample web applications that include this package may be configured to track deployments to [IBM Bluemix](https://www.bluemix.net/) and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service on each deployment:

* Node.js package version
* Node.js repository URL
* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)
* Labels of bound services
* Number of instances for each bound service and associated plan information

This data is collected from the `package.json` file in the sample application and the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix to measure the usefulness of our examples, so that we can continuously improve the content we offer to you. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

[deploy_track_url]: https://github.com/cloudant-labs/deployment-tracker
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: https://www.ibm.com/watson/developercloud/doc/common/index.html
[service_url]: http://www.ibm.com/watson/developercloud/discovery.html
[docs]: http://www.ibm.com/watson/developercloud/doc/discovery/index.html
[sign_up]: https://console.ng.bluemix.net/registration/
