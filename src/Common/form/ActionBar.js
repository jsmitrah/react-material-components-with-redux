import React from "react";
import Sticky from "react-sticky-el";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

function ActionBar({ primaryButtonProps, cancelBtnProps }) {
  return (
    <Sticky mode="bottom" style={{ zIndex: "100" }}>
      <Paper elevation={1}>
        <div className="footer-buttons">
          <div className="float-right actionButton">
            {primaryButtonProps ? (
              <Button
                className="float-right"
                variant="contained"
                type="submit"
                color="primary"
              >
                {primaryButtonProps.label}
              </Button>
            ) : null}
          </div>
          {cancelBtnProps ? <Button variant="contained">Cancel</Button> : null}
        </div>
      </Paper>
    </Sticky>
  );
}

export default ActionBar;
