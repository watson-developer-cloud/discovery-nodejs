import React from 'react';
import moment from 'moment';
import { TextInput, Icon, ButtonsGroup } from 'watson-react-components';

export default React.createClass({
  displayName: 'QueryCollapsed',

  propTypes: {
    onQueryChange: React.PropTypes.func.isRequired,
    query: React.PropTypes.shape({
      text: React.PropTypes.string,
      date: React.PropTypes.shape({
        from: React.PropTypes.string,
        to: React.PropTypes.string,
      }),
    }).isRequired,
  },

  getInitialState() {
    return {
      focusedInput: null,
      startDate: moment(this.props.query.date.from),
      endDate: moment(this.props.query.date.to),
      query: this.props.query,
      restrictedDateRange: false,
      dateButtons: [{ value: 'lastweek',
        id: 'rb-1',  // id's must be unique across the entire page. Default value is name-value
        text: 'Last Week',
        startDate: moment().subtract(1,'w'),
        endDate: moment()
      }, {
        value: 'lasttwoweeks',
        id: 'rb-2',
        text: 'Last 2 Weeks',
        startDate: moment().subtract(2,'w'),
        endDate: moment()
      }, {
        value: 'lastmonth',
        id: 'rb-3',
        text: 'Last Month',
        startDate: moment().subtract(30,'d'),
        endDate: moment()
      }, {
        value: 'lasttwomonths',
        id: 'rb-4',
        text: 'Last 2 Months',
        selected: true,
        startDate: moment().subtract(60,'d'),
        endDate: moment()
      }],
    };
  },

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  },

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
    this.props.onQueryChange({
      text: this.state.query.text,
      date: {
        from: this.state.startDate.format('YYYYMMDD'),
        to: this.state.endDate.format('YYYYMMDD'),
      },
      restrictedDateRange: this.state.restrictedDateRange,
    });
  },

  componentWillUnMount() {
    window.removeEventListener('resize', this.onResize);
  },

  /**
   * On Input text change
   */
  handleInputChange(event) {
    this.setState({ query: { text: event.target.value } });
  },
  /**
   * On Input text key press
   */
  handleKeyPress(event) {
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
  },
  handleSearchClick() {
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
  },
  dateButtonChanged(e) {
    var newDates = {};
    var largestValue = "lasttwomonths";
    var restrictedDateRange;
    let newButtonState = this.state.dateButtons.map((item) => {
      item.selected = item.value == e.target.value ? true : false;
      if (item.selected) {
        newDates = {startDate: item.startDate, endDate: item.endDate};
        restrictedDateRange = item.value != largestValue;
      }
      return item;
    });
    Promise.resolve(
      this.setState({restrictedDateRange: restrictedDateRange})
    ).then(() => {
      this.setState({dateButtons: newButtonState});
      this.onDatesChange(newDates);
    });
  },
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
                <div onClick={this.handleSearchClick} className="query--icon-container">
                  <Icon type="search" size="regular" fill="#ffffff" />
                </div>
              </div>
            </div>
            <div className="query--date-buttons-container">
              <ButtonsGroup
                type="radio"  // radio, button, or checkbox
                name="radio-buttons"
                onChange={this.dateButtonChanged}
                buttons={this.state.dateButtons}
                  />
            </div>
          </div>
        </div>
      </section>
    );
  },
});
