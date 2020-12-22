import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//response pop up after registration and add event
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    textTransform: "none",
    backgroundColor: "#343a40",
  },
}));

const ConfirmationPopup = (props) => {
    const classes = useStyles();
  return (
    <React.Fragment>
      <Modal
        open={props.response}
        onClose={props.handleOk}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.paper}>
          <p id="simple-modal-description">{props.responseMessage}</p>
          <Button
            size="medium"
            variant="contained"
            className={classes.text}
            onClick={props.handleOk}
          >
            OK
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationPopup;
