import React from 'react';
import { Tabs, Pane, Code } from 'watson-react-components';

const QuerySyntax = props => (
  <div className="code-results">
    <div className="code-results--header-row">
      <h2 className="base--h2 code-results--header">{props.title}</h2>
      <div className="code-results--header-spacer" />
      {props.onGoBack ? (
        <div className="code-results--button-container">
          <button
            className="base--button code-results--button"
            onClick={props.onGoBack}
          >
            Go Back
          </button>
        </div>
      ) : null}
    </div>
    <Tabs selected={0}>
      <Pane label="Query">
        <div className="code-results--fake-bg">
          <div className="code-results--fake-border" />
        </div>
        <Code language="json">
          {typeof props.query === 'object' ?
          JSON.stringify(props.query, null, 2) : props.query}
        </Code>
      </Pane>
      <Pane label="Response">
        <div className="code-results--fake-bg">
          <div className="code-results--fake-border" />
        </div>
        <Code language="json">
          {typeof props.response === 'object' ?
          JSON.stringify(props.response, null, 2) : props.response}
        </Code>
      </Pane>
    </Tabs>
  </div>
);

QuerySyntax.propTypes = {
  query: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string, // json string
  ]).isRequired,
  response: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string, // json string
  ]).isRequired,
  title: React.PropTypes.string.isRequired,
  onGoBack: React.PropTypes.func,
};


export default QuerySyntax;
