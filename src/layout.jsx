import React from 'react';
import { Header, Jumbotron, Footer } from 'watson-react-components';
import Demo from './demo';

export default function Layout() {
  return (
    <div>
      <Header
        mainBreadcrumbs="Discovery"
        mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
        subBreadcrumbs="Discovery Demo"
        subBreadcrumbsUrl="/"
      />
      <Jumbotron
        serviceName="Discovery"
        repository="https://github.com/watson-developer-cloud/discovery-nodejs"
        documentation="https://console.bluemix.net/docs/services/discovery/index.html"
        apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
        startInBluemix="https://console.bluemix.net/registration?target=%2Fdeveloper%2Fwatson%2Fcreate-project%3Fservices%3Ddiscovery%26action%3Dcreate%26cm_mmc%3DOSocial_Tumblr-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmc%3DOSocial_Tumblr-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmca1%3D000000OF%26cm_mmca2%3D10000409"
        version="GA"
        description="Unlock hidden value in data to find answers, monitor trends and surface patterns, with the world’s most advanced cloud-native insight engine."
      />
      <Demo />
      <div className="footer-container--div">
        <Footer />
      </div>
    </div>
  );
}
