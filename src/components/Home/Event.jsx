import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddEvent from "./AddEvent";
import Modal from "@material-ui/core/Modal";
import Blogs from "../Blogs";
import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
  text: {
    textTransform: "none",
    backgroundColor: "#343a40",
  },
  paper: {
    height: 100,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  widthMax: {
    maxWidth: 345,
    margin: "auto",
    marginTop: 40,
  },
  heightMax: {
    minHeight: 200,
  },
}));

//adding and listing of event component
const Event = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button
              size="medium"
              variant="contained"
              className={classes.text}
              onClick={handleOpen}
            >
              Add new Event
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <div className="card-container">
        <Blogs />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddEvent onClose={handleClose} />
      </Modal>
      <Footer />
    </React.Fragment>
  );
};
export default Event;
