import React, { Component } from 'react';
import {
  string, bool, shape, func,
} from 'prop-types';
import moment from 'moment';
import { TextInput, Icon, ButtonsGroup } from 'watson-react-components';

export default class Collapsed extends Component {
  static propTypes = {
    onQueryChange: func.isRequired,
    query: shape({
      text: string,
      date: shape({
        from: string,
        to: string,
      }),
      enabled: bool,
    }).isRequired,
  }

  state = {
    startDate: moment(this.props.query.date.from),
    endDate: moment(this.props.query.date.to),
    query: { ...this.props.query, enabled: this.props.query.text.length > 0 },
    restrictedDateRange: false,
    dateButtons: [
      {
        value: 'lastweek',
        id: 'rb-1',
        text: 'Last Week',
        startDate: moment().subtract(1, 'w'),
        endDate: moment(),
      },
      {
        value: 'lasttwoweeks',
        id: 'rb-2',
        text: 'Last 2 Weeks',
        startDate: moment().subtract(2, 'w'),
        endDate: moment(),
      },
      {
        value: 'lastmonth',
        id: 'rb-3',
        text: 'Last Month',
        startDate: moment().subtract(30, 'd'),
        endDate: moment(),
      },
      {
        value: 'lasttwomonths',
        id: 'rb-4',
        text: 'Last 2 Months',
        selected: true,
        startDate: moment().subtract(60, 'd'),
        endDate: moment(),
      },
    ],
  }

  onDatesChange = () => {
    this.props.onQueryChange({
      text: this.state.query.text,
      date: {
        from: this.state.startDate.format('YYYYMMDD'),
        to: this.state.endDate.format('YYYYMMDD'),
      },
      restrictedDateRange: this.state.restrictedDateRange,
    });
  }

  buttonState = () => (this.state.query.enabled
    ? ('query--date-buttons-container')
    : ('query--date-buttons-disabled query--date-buttons-container'))

  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      query: {
        text: value,
        enabled: value.length > 0,
      },
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value.match(/[^\s]+/)) {
      this.props.onQueryChange({
        text: this.state.query.text,
        date: {
          from: this.state.startDate.format('YYYYMMDD'),
          to: this.state.endDate.format('YYYYMMDD'),
        },
        restrictedDateRange: this.state.restrictedDateRange,
      });
    }
  }

  handleSearchClick = () => {
    if (this.state.query && this.state.query.text.match(/[^\s]+/)) {
      this.props.onQueryChange({
        text: this.state.query.text,
        date: {
          from: this.state.startDate.format('YYYYMMDD'),
          to: this.state.endDate.format('YYYYMMDD'),
        },
        restrictedDateRange: this.state.restrictedDateRange,
      });
    }
  }

  dateButtonChanged = (e) => {
    let newDates = {};
    const largestValue = 'lasttwomonths';
    let restrictedDateRange;
    const newButtonState = this.state.dateButtons.map((item) => {
      const newItem = { ...item, selected: item.value === e.target.value };
      if (newItem.selected) {
        newDates = {
          startDate: newItem.startDate,
          endDate: newItem.endDate,
        };
        restrictedDateRange = newItem.value !== largestValue;
      }
      return newItem;
    });
    this.setState({
      restrictedDateRange,
      dateButtons: newButtonState,
      startDate: newDates.startDate,
      endDate: newDates.endDate,
    }, this.onDatesChange);
  }

  render() {
    return (
      <section className="_full-width-row query query_collapsed">
        <div className="_container _container_large">
          <div className="query--flex-container">
            <div className="query--text-input-container">
              <div className="query--search-container">
                <TextInput
                  onInput={this.handleInputChange}
                  onKeyPress={this.handleKeyPress}
                  defaultValue={this.state.query.text || ''}
                  placeholder="What company are you interested in?"
                />
                <button
                  type="button"
                  onClick={this.handleSearchClick}
                  className="query--icon-container"
                >
                  <Icon type="search" size="regular" fill="#ffffff" />
                </button>
              </div>
            </div>
            <div className={this.buttonState()}>
              <ButtonsGroup
                type="radio"
                name="radio-buttons"
                onChange={this.dateButtonChanged}
                buttons={this.state.dateButtons}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
