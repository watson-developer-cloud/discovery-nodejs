import React from 'react';
import {Header, Jumbotron, Footer, Alert} from 'watson-react-components';
import Demo from './demo';

export default function Layout() {
  return (
    <div>
      <Header
        mainBreadcrumbs="Discovery"
        mainBreadcrumbsUrl="https://www.ibm.com/cloud/watson-discovery"
        subBreadcrumbs="Discovery Demo"
        subBreadcrumbsUrl="/"
      />
      <Jumbotron
        serviceName="Discovery"
        repository="https://github.com/watson-developer-cloud/discovery-nodejs"
        documentation="https://cloud.ibm.com/docs/discovery?topic=discovery-about"
        apiReference="https://cloud.ibm.com/apidocs/discovery/discovery"
        startInBluemix="https://cloud.ibm.com/registration/?target=%2Fcatalog%2Fservices%2Fdiscovery%3FhideTours%3Dtrue%26cm_mmc%3D-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmc%3D-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmca1%3D000000OF%26cm_mmca2%3D10000409"
        version="GA"
        description="Unlock hidden value in data to find answers, monitor trends and surface patterns, with the world’s most advanced cloud-native insight engine."
      />

      <div className="new_demo_notification">
        <Alert type="info" color="blue">
          We also have new demos for <a href="https://www.ibm.com/demos/live/watson-discovery/self-service" target="blank">Discovery</a> and <a href="https://www.ibm.com/demos/live/discovery-expert-assist/self-service" target="blank">Expert assist</a> available now.
        </Alert>
      </div>

      <Demo />

      <div className="footer-container--div">
        <section className="_full-width-row footer-gdpr--section">
          <span>
            This system is for demonstration purposes only and is not intended to process Personal
            Data. No Personal Data is to be entered into this system as it may not have the
            necessary controls in place to meet the requirements of the General Data Protection
            Regulation (EU) 2016/679
          </span>
        </section>
        <Footer />
      </div>
    </div>
  );
}
