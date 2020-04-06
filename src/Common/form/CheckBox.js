import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutline from "@material-ui/icons/HelpOutline";
import _uniqueId from "lodash/uniqueId";
import Typography from "@material-ui/core/Typography";

const CheckBox = ({
  input: { value, ...inputProps },
  tooltipText,
  label,
  ...rest
}) => {
  let uniqueId = _uniqueId("InputField");
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...inputProps}
          id={uniqueId}
          checked={value ? true : false}
          onChange={inputProps.onChange}
          color="primary"
          {...rest}
        />
      }
      label={
        <div className="d-flex">
          <Typography>{label}</Typography>
          {tooltipText ? (
            <Tooltip
              id={uniqueId}
              title={<div dangerouslySetInnerHTML={{ __html: tooltipText }} />}
            >
              <HelpOutline className="tooltipSpace" color="action" />
            </Tooltip>
          ) : null}
        </div>
      }
    />
  );
};

export default CheckBox;
