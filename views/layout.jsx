import React from 'react';
import { Header, Jumbotron, Footer } from 'watson-react-components';

// eslint-disable-next-line
const DESCRIPTION = 'Add a cognitive search and content analytics engine to applications to identify patterns, trends and actionable insights that drive better decision-making.';

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <title>Discovery Demo</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content="Discovery Demo" />
        <meta name="og:description" content={DESCRIPTION} />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="stylesheet" href="/css/watson-react-components.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {/* Bluemix Analytics - begin*/}
        <script type="text/javascript">{`
          window._analytics = { coremetrics: false, optimizely: false, addRoll: false };
        `}</script>
        <meta name="segment" property="watson-demos" value="discovery-news-demo" />
        <script src={props.bluemixAnalytics} />
        {/* Bluemix Analytics  - end*/}
      </head>
      <body>
        <Header
          mainBreadcrumbs="Discovery"
          mainBreadcrumbsUrl="http://www.ibm.com/watson/developercloud/discovery.html"
          subBreadcrumbs="Discovery Demo"
          subBreadcrumbsUrl="https://discovery-news-demo.mybluemix.net"
        />
        <Jumbotron
          serviceName="Discovery"
          repository="https://github.com/watson-developer-cloud/discovery-nodejs"
          documentation="http://www.ibm.com/watson/developercloud/doc/discovery"
          apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
          startInBluemix="https://console.ng.bluemix.net/registration/?target=/catalog/services/discovery/"
          version="GA"
          description={DESCRIPTION}
        />
        <div id="root">
          {props.children}
        </div>
        <div style={{ marginTop: '0rem' }}>
          <Footer />
        </div>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        <script type="text/javascript" src="js/bundle.js" />
        <script type="text/javascript" src="js/ga.js" />
      </body>
    </html>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired,
  bluemixAnalytics: React.PropTypes.string,
};

export default Layout;
