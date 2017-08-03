import React, { Component } from 'react';
import { string, object, shape } from 'prop-types';
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
import queryBuilder from '../query-builder.js';  // eslint-disable-line
import Accordion from '../Accordion/index.jsx';
import NoContent from '../NoContent/index.jsx';
import { getNames, getItemsForName } from './mentionsParser';
import capitalize from './capitalize';

export default class MentionsAndSentiments extends Component {
  static propTypes = {
    mentions: object.isRequired,
    query: shape({
      text: string,
      date: object
    })
  }

  state = {
    showQuery: false,
    mentions: this.getData()
  }

  calculateMentionCount(data) {
    let totalSum = data.reduce((acc, item) => {
      return acc + item.positive + item.neutral + item.negative
    }, 0);
    return totalSum;
  }

  getData() {
    const { mentions, query } = this.props;

    let mentions_data = getNames(mentions.aggregations[0].results)
      .filter((name) => !(new RegExp(query.text, 'gi').test(name))) // filter out a mention that matches the query text input
      .filter((name) => /^[A-Z]/.test(name)) // check if name is capitalized (to ensure a brand is used)
      .map((name, i) => ({
        name,
        toggle: i === 0,
        data: getItemsForName(mentions.aggregations[0].results, name).results
          .filter((v, j) => j > 0)
          .map((item) => ({
            date: moment(item[0]).format('MM/DD'),
            positive: item[1],
            negative: item[2],
            neutral: item[3],
          })),
    }));

    mentions_data = mentions_data.map((mention) => {
      return Object.assign({}, mention, {
        totalMentions: this.calculateMentionCount(mention.data)
      });
    });

    mentions_data = mentions_data.sort((a, b) => {
      return b.totalMentions - a.totalMentions;
    }).filter((name, i) => i < 4);

    // calculate sentiments
    mentions_data = mentions_data.map((item) => {
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
        item.sentiment = Object.keys(sentimentSums).reduce(
          (prev, cur) => (sentimentSums[prev] > sentimentSums[cur] ? prev : cur)
        );
      }
      return item;
    });

    return mentions_data;
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  widgetTitle() {
    return 'Co-Mentions & Trends';
  }

  toggleContent(index) {
    const mentions = this.state.mentions;
    mentions[index].toggle = !mentions[index].toggle;
    this.setState({ mentions });
  }

  render() {
    const { query, mentions } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
                <div className="mentions-sentiments widget">
                  <div className="widget--header">
                    <h2 className="base--h2 widget--header-title">
                      { this.widgetTitle() }
                    </h2>
                    <div className="widget--header-spacer" />
                      <button
                        className="base--button widget--header-button"
                        onClick={this.onShowQuery}
                      >
                        View Query
                      </button>
                    </div>
                    <p className="base--p mentions-sentiments--description">
                      Identify frequently co-mentioned entities and follow trends in sentiment.
                    </p>
                    <div className="accordions--wrapper">
                      {
                        this.state.mentions.length > 0
                          ? (
                                <div>
                                  <div className="mentions-sentiments--header-row">
                                    <div className="mentions-sentiments--header-row-name">
                                      Topic
                                    </div>
                                    <div className="mentions-sentiments--header-row-mentions">
                                      Number of Mentions
                                    </div>
                                    <div className="mentions-sentiments--header-row-sentiment">
                                      Sentiment
                                    </div>
                                  </div>
                                  <div className="accordions">
                                  {
                                    this.state.mentions.map((item, index) =>
                                      <Accordion
                                        key={index}
                                        show={item.toggle}
                                        onClickToggle={() => this.toggleContent(index)}
                                        header={
                                          <div className="mentions-sentiments--data-row">
                                            <div className="mentions-sentiments--data-name">
                                              { `${capitalize(query.text)} + ${item.name}` }
                                            </div>
                                            <div className="mentions-sentiments--data-mentions">
                                              { item.totalMentions }
                                            </div>
                                            <div className="mentions-sentiments--data-sentiment">
                                              { capitalize(item.sentiment) }
                                            </div>
                                          </div>
                                        }
                                        content={(
                                          <ResponsiveContainer
                                            width={'100%'}
                                            height={250}
                                          >
                                            <LineChart
                                              data={item.data}
                                              margin={{
                                                top: 40,
                                                right: 30,
                                                bottom: 0,
                                                left: -20
                                              }}
                                            >
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
                                                activeDot={{
                                                  strokeWidth: 2,
                                                  r: 4,
                                                  fill: '#40d5bb'
                                                }}
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
                                                activeDot={{
                                                  strokeWidth: 2,
                                                  r: 4,
                                                  fill: '#ff509e'
                                                }}
                                              />
                                              <CartesianGrid stroke="#ccc" />
                                              <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                              />
                                              <YAxis
                                                padding={{ top: 10}}
                                                label="&nbsp;&#x23; of articles"
                                                allowDecimals={false}
                                                tickLine={false}
                                              />
                                              <Legend
                                                align="left"
                                                iconSize={20}
                                              />
                                              <Tooltip />
                                            </LineChart>
                                          </ResponsiveContainer>
                                        )}
                                      />
                                    )
                                  }
                                  </div>
                                </div>
                            )
                          : (
                              <NoContent
                                query={query}
                                message={'There are no analytics available for your query.'}
                              />
                            )
                      }
                  </div>
                </div>
              )
            : (
                <QuerySyntax
                  title={this.widgetTitle()}
                  query={queryBuilder.build(query, true)}
                  response={{ mentions }}
                  onGoBack={this.onShowResults}
                />
              )
        }
      </div>
    );
  }
}
