import React from 'react';
import { DateRangePicker } from 'react-dates';

/*
This is a wrapper React component for react-dates.  The purpose of the wrapper is
to cleanly abstract out the logic of the refreshDatePicker hack, explained more
in comments below.
 */
const DatePicker = (props) =>
  (props.refreshDatePicker ? (
    <DateRangePicker
      {...props}
    />
  ) : (
    // refreshDatePicker will have 10ms of being false.  During this interval,
    // the actual component is replaced with a static copy of the html parts we want to render
    // to create the illusion of a continuous user experience with this component.
    <div className="DateRangePicker">
      <div className="DateRangePickerInput">
        <div className="DateInput">
          <label className="DateInput__label" htmlFor="startDate">Start Date</label>
          <input
            type="text"
            className="DateInput__input"
            id="startDate"
            name="startDate"
            value={props.startDate.format('MM/DD/YYYY')}
            placeholder="Start Date"
            autoComplete="off"
            readOnly
          />
          <div className="DateInput__display-text DateInput__display-text--has-input">{props.startDate.format('MM/DD/YYYY')}</div>
        </div>
        <div className="DateRangePickerInput__arrow">
          <svg viewBox="0 0 1000 1000">
            <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" />
          </svg>
        </div>
        <div className="DateInput">
          <label className="DateInput__label" htmlFor="endDate">End Date</label>
          <input
            type="text"
            className="DateInput__input"
            id="endDate"
            name="endDate"
            value={props.endDate.format('MM/DD/YYYY')}
            placeholder="End Date"
            autoComplete="off"
            readOnly
          />
          <div className="DateInput__display-text DateInput__display-text--has-input">{props.endDate.format('MM/DD/YYYY')}</div>
        </div>
      </div>
    </div>
  ));

DatePicker.propTypes = {
  refreshDatePicker: React.PropTypes.bool.isRequired,
  startDate: React.PropTypes.object,  // moment object
  endDate: React.PropTypes.object,    // moment object
};

export default DatePicker;
