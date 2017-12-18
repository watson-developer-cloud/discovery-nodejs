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
        startInBluemix="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
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
