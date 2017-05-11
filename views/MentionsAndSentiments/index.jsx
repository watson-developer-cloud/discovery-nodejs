import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import moment from 'moment';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line
import Accordion from '../Accordion/index.jsx';
import { getNames, getItemsForName } from './mentionsParser';
import capitalize from './capitalize';

export default React.createClass({
  propTypes: {
    mentions: React.PropTypes.object.isRequired,
    query: React.PropTypes.shape({
      text: React.PropTypes.string,
      date: React.PropTypes.object,
    }),
  },

  calculateMentionCount(data) {
    let totalSum = data.reduce((acc, item) => {
      return acc + item.positive + item.neutral + item.negative
    }, 0);
    return totalSum;
  },

  getInitialState() {
    let mentions = getNames(this.props.mentions.aggregations[0].results)
      .filter((name) => !(new RegExp(this.props.query.text, 'gi').test(name))) // filter out a mention that matches the query text input
      .filter((name) => /^[A-Z]/.test(name)) // check if name is capitalized (to ensure a brand is used)
      .map((name, i) => ({
        name,
        toggle: i === 0,
        data: getItemsForName(this.props.mentions.aggregations[0].results, name).results
          .filter((v, j) => j > 0)
          .map((item) => ({
            date: moment(item[0]).format('MM/DD'),
            positive: item[1],
            negative: item[2],
            neutral: item[3],
          })),
    }));

    mentions = mentions.map((mention) => {
      return Object.assign({}, mention, {
        totalMentions: this.calculateMentionCount(mention.data)
      })
    })

    mentions = mentions.sort((a, b) => (b.totalMentions - a.totalMentions))
      .filter((name, i) => i < 4);

    // calculate sentiments
    mentions = mentions.map((item) => {
      // sum up all the negatives, positives, and neutrals
      const sentimentSums = item.data.reduce(
        (prev, cur) => ({
          negative: prev.negative + cur.negative,
          neutral: prev.neutral + cur.neutral,
          positive: prev.positive + cur.positive,
        }), { negative: 0, neutral: 0, positive: 0 });
      // return neutral if negatives = positives
      if (sentimentSums.negative === sentimentSums.positive) {
        item.sentiment = 'neutral'; // eslint-disable-line
      } else { // else return largest sentiment
        // eslint-disable-next-line
        item.sentiment = Object.keys(sentimentSums).reduce(
          (prev, cur) => (sentimentSums[prev] > sentimentSums[cur] ? prev : cur)
        );
      }
      return item;
    });

    return {
      showQuery: false,
      mentions,
    };
  },

  onShowQuery() {
    this.setState({ showQuery: true });
  },

  onShowResults() {
    this.setState({ showQuery: false });
  },

  widgetTitle() {
    return 'Co-Mentions & Trends';
  },

  toggleContent(index) {
    const mentions = this.state.mentions;
    mentions[index].toggle = !mentions[index].toggle;
    this.setState({ mentions });
  },

  render() {
    return (
      <div>
        {!this.state.showQuery ? (
          <div className="mentions-sentiments widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">{this.widgetTitle()}</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p mentions-sentiments--description">
              Identify frequently co-mentioned entities and follow trends in sentiment.
            </p>
            <div className="mentions-sentiments--header-row">
              <div className="mentions-sentiments--header-row-name">Topic</div>
              <div className="mentions-sentiments--header-row-mentions">Number of Mentions</div>
              <div className="mentions-sentiments--header-row-sentiment">Sentiment</div>
            </div>
            <div className="accordions">
              {this.state.mentions.map((item, index) =>
                <Accordion
                  key={index}
                  show={this.state.mentions[index].toggle}
                  onClickToggle={() => this.toggleContent(index)}
                  header={
                    <div className="mentions-sentiments--data-row">
                      <div className="mentions-sentiments--data-name">{`${capitalize(this.props.query.text)} + ${item.name}`}</div>
                      <div className="mentions-sentiments--data-mentions">{this.calculateMentionCount(item.data)}</div>
                      <div className="mentions-sentiments--data-sentiment">{capitalize(item.sentiment)}</div>
                    </div>
                  }
                  content={(
                    <ResponsiveContainer width={'100%'} height={250}>
                      <LineChart data={item.data} margin={{ top: 40, right: 30, bottom: 0, left: -20 }}>
                        <Line
                          type="linear"
                          dataKey="positive"
                          name="Positive Sentiment"
                          stroke="#00a78f"
                          strokeWidth="3"
                          dot={{
                            stroke: '#40d5bb',
                            strokeWidth: 2,
                            r: 4,
                          }}
                          activeDot={{ strokeWidth: 2, r: 4, fill: '#40d5bb' }}
                        />
                        <Line
                          type="linear"
                          dataKey="negative"
                          name="Negative Sentiment"
                          stroke="#dc267f"
                          strokeWidth="3"
                          strokeDasharray="6, 8"
                          dot={{
                            stroke: '#ff509e',
                            strokeDasharray: '0',
                            strokeWidth: 2,
                            r: 4,
                          }}
                          activeDot={{ strokeWidth: 2, r: 4, fill: '#ff509e' }}
                        />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" tickLine={false} />
                        <YAxis padding={{ top: 10}} label="&nbsp;&#x23; of articles" allowDecimals={false} tickLine={false} />
                        <Legend
                          align="left"
                          iconSize={20}
                        />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                />
              )}
            </div>
          </div>
        ) : (
          <QuerySyntax
            title={this.widgetTitle()}
            query={queryBuilder.build(this.props.query, true)}
            response={{ mentions: this.props.mentions }}
            onGoBack={this.onShowResults}
          />
        )
      }
      </div>
    );
  },
});
