import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.dialogOpen);
  useEffect(() => {
    setOpen(open);
    props.closeWindow(open);
  }, [props, open]);
  const handleClose = () => {
    props.deleteCOntent();
    setOpen(false);
  };

  const { details } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
      >
        <DialogTitle id="alert-dialog-title">{details.label}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="dialogWidth"
          >
            {details.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            autoFocus
          >
            {details.label}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
