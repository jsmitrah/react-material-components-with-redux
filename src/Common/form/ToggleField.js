import React, { Fragment } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Typography from "@material-ui/core/Typography";

const ToggleField = ({ input, label, tooltipText, ...rest }) => {
  return (
    <FormControlLabel
      label={
        <Fragment>
          <div className="d-flex">
            <Typography variant="subtitle1">
              <b>{label}</b>
            </Typography>
            {tooltipText ? (
              <Tooltip
                title={
                  <div dangerouslySetInnerHTML={{ __html: tooltipText }} />
                }
              >
                <HelpOutline className="ml-2 bottom-5" color="action" />
              </Tooltip>
            ) : null}
          </div>
        </Fragment>
      }
      labelPlacement="start"
      control={
        <Switch
          {...input}
          checked={!!input.value}
          value={input.value.toString()}
          color="primary"
        />
      }
      {...rest}
    />
  );
};

export default ToggleField;
