import React, { useState, Fragment } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutline from "@material-ui/icons/HelpOutline";
const DateTimeField = ({ label, tooltipText }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <KeyboardDateTimePicker
      variant="inline"
      value={selectedDate}
      onChange={handleDateChange}
      format="YYYY/MM/DD hh:mm a"
      label={
        <Fragment>
          <span className={tooltipText && "bottom-10"}>{label}</span>
          {tooltipText ? (
            <Tooltip
              title={<div dangerouslySetInnerHTML={{ __html: tooltipText }} />}
            >
              <HelpOutline className="bottom-5 ml-2" color="action" />
            </Tooltip>
          ) : null}
        </Fragment>
      }
    />
  );
};

export default DateTimeField;
