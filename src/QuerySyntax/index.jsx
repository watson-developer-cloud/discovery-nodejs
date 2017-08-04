import React from 'react';
import { string, oneOfType, shape, func } from 'prop-types';
import { Tabs, Pane, Code } from 'watson-react-components';

function QuerySyntax({ query, response, title, onGoBack }) {
  return (
    <div className="code-results">
      <div className="code-results--header-row">
        <h2 className="base--h2 code-results--header">
          { title }
        </h2>
        <div className="code-results--header-spacer" />
        {
          onGoBack && (
            <div className="code-results--button-container">
              <button
                className="base--button code-results--button"
                onClick={onGoBack}
              >
                Go Back
              </button>
            </div>
          )
        }
      </div>
      <Tabs selected={0}>
        <Pane label="Query">
          <div className="code-results--fake-bg">
            <div className="code-results--fake-border" />
          </div>
          <Code language="json">
            {
              typeof query === 'object'
                ? JSON.stringify(query, null, 2)
                : query
            }
          </Code>
        </Pane>
        <Pane label="Response">
          <div className="code-results--fake-bg">
            <div className="code-results--fake-border" />
          </div>
          <Code language="json">
            {
              typeof response === 'object'
                ? JSON.stringify(response, null, 2)
                : response
            }
          </Code>
        </Pane>
      </Tabs>
    </div>
  );
}

QuerySyntax.propTypes = {
  query: oneOfType([
    shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }),
    string, // json string
  ]).isRequired,
  response: oneOfType([
    shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }),
    string, // json string
  ]).isRequired,
  title: string.isRequired,
  onGoBack: func,
};

QuerySyntax.defaultProps = {
  onGoBack: null,
};

export default QuerySyntax;
