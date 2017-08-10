import React, { Component } from 'react';
import classNames from 'classnames';
import { string, number, shape, arrayOf } from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import moment from 'moment';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import NoContent from '../NoContent/index';
import AnomalyDot from './AnomalyDot';
import AnomalyTooltip from './AnomalyTooltip';
import NoAnomaliesOverlay from './NoAnomaliesOverlay';

export default class AnomalyDetection extends Component {
  static propTypes = {
    anomalyData: arrayOf(shape({
      key_as_string: string.isRequired,
      matching_results: number.isRequired,
      anomaly: number,
    })).isRequired,
    query: shape({
      text: string.isRequired,
    }).isRequired,
    colorLine: string.isRequired,
  }

  static defaultProps = {
    colorLine: '#00a78f',
  }

  static widgetTitle() {
    return 'Anomaly Detection';
  }

  static widgetDescription() {
    return 'Identify anomalies in total number of articles over the specified timeframe';
  }

  static formatDate(date) {
    return moment(date).format('MM/DD');
  }

  static hasAnomaly(payload) {
    return payload && payload.anomaly;
  }

  static hasAnomalies(anomalyData) {
    return anomalyData.some(result => result.anomaly);
  }

  state = {
    showQuery: false,
    showOverlay: !AnomalyDetection.hasAnomalies(this.props.anomalyData),
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  handleViewData = () => {
    this.setState({ showOverlay: false });
  }

  render() {
    const { query, anomalyData, colorLine } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
              <div className="anomaly-detection widget">
                <WidgetHeader
                  title={AnomalyDetection.widgetTitle()}
                  description={AnomalyDetection.widgetDescription()}
                  onShowQuery={this.onShowQuery}
                />
                {
                  anomalyData.length > 0
                    ? (
                      <div className="anomaly-chart-container--div">
                        <ResponsiveContainer
                          height={250}
                        >
                          <LineChart
                            data={anomalyData}
                            className={
                              classNames('anomaly-chart--svg',
                                {
                                  faded: this.state.showOverlay,
                                },
                              )
                            }
                            margin={{
                              top: 40,
                              right: 30,
                              bottom: 0,
                              left: -10,
                            }}
                          >
                            <Line
                              type="linear"
                              dataKey="matching_results"
                              name="Matching Results"
                              stroke={colorLine}
                              strokeWidth="3"
                              dot={<AnomalyDot />}
                              activeDot={<AnomalyDot active />}
                            />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis
                              dataKey="key_as_string"
                              tickFormatter={AnomalyDetection.formatDate}
                              tickLine={false}
                            />
                            <YAxis
                              label="&nbsp;&#x23; of articles"
                              allowDecimals={false}
                              tickLine={false}
                              padding={{ top: 10 }}
                            />
                            <Tooltip
                              labelFormatter={AnomalyDetection.formatDate}
                              content={<AnomalyTooltip />}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                        {
                          this.state.showOverlay && (
                            <NoAnomaliesOverlay
                              text={query.text}
                              onViewData={this.handleViewData}
                            />
                          )
                        }
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
            )
            : (
              <QuerySyntax
                title={AnomalyDetection.widgetTitle()}
                query={queryBuilder.build(query, true)}
                response={{ results: anomalyData }}
                onGoBack={this.onShowResults}
              />
            )
        }
      </div>
    );
  }
}
