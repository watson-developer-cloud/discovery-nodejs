import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
} from 'recharts';
import moment from 'moment';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import NoContent from '../NoContent/index';

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
    colorAnomaly: string.isRequired,
    colorAnomalyActive: string.isRequired,
  }

  static defaultProps = {
    colorAnomaly: '#8c101c',
    colorAnomalyActive: '#ff5050',
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
    return payload.anomaly;
  }

  state = {
    showQuery: false,
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  renderDot = (dotProps, color) => {
    const dotColor = color || this.props.colorAnomaly;
    const { payload } = dotProps;
    const newProps = Object.assign({}, dotProps, {
      fill: AnomalyDetection.hasAnomaly(payload) ? dotColor : dotProps.fill,
      stroke: AnomalyDetection.hasAnomaly(payload) ? dotColor : dotProps.stroke,
    });

    return <Dot {...newProps} />;
  }

  renderActiveDot = props =>
    this.renderDot(props, this.props.colorAnomalyActive);

  renderTooltip = (tooltipProps) => {
    const { payload } = tooltipProps;
    let additionalEntry;
    if (payload.length > 0 && AnomalyDetection.hasAnomaly(payload[0].payload)) {
      additionalEntry = {
        dataKey: 'anomaly',
        name: 'Anomaly',
        color: this.props.colorAnomalyActive,
        value: payload[0].payload.anomaly,
      };
    }
    const newProps = Object.assign({}, tooltipProps, {
      content: null,
      payload: additionalEntry
        ? tooltipProps.payload.concat(additionalEntry)
        : tooltipProps.payload,
    });
    return <Tooltip {...newProps} />;
  }

  render() {
    const { query, anomalyData } = this.props;

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
                    <ResponsiveContainer
                      width={'100%'}
                      height={250}
                    >
                      <LineChart
                        data={anomalyData}
                        margin={{
                          top: 40,
                          right: 30,
                          bottom: 0,
                          left: -20,
                        }}
                      >
                        <Line
                          type="linear"
                          dataKey="matching_results"
                          name="Matching Results"
                          stroke="#00a78f"
                          strokeWidth="3"
                          dot={this.renderDot}
                          activeDot={this.renderActiveDot}
                        />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis
                          dataKey="key_as_string"
                          tickFormatter={AnomalyDetection.formatDate}
                          tickLine={false}
                        />
                        <YAxis
                          padding={{ top: 10 }}
                          label="&nbsp;&#x23; of articles"
                          allowDecimals={false}
                          tickLine={false}
                        />
                        <Tooltip
                          labelFormatter={AnomalyDetection.formatDate}
                          content={this.renderTooltip}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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
              response={{ anomalyData }}
              onGoBack={this.onShowResults}
            />
          )
      }
      </div>
    );
  }
}
