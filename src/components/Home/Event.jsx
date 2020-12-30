import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddEvent from "./AddEvent";
import Modal from "@material-ui/core/Modal";
import Blogs from "../Blogs";
import Footer from "../Footer";
import { connect } from "react-redux";
import { addEventHidden, addEventVisible } from "../../redux";

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
const Event = (props) => {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  const [singleBlog, setSingleBlog] = useState({});
  const [eventId, setEventId] = useState("");
  const child1Method_ref = React.useRef(null);

  const handleClose = () => {
    // setOpen(false);
    props.addEventHidden();
  };
  const handleOpen = () => {
    // setOpen(true);/
    setSingleBlog({});
    setEventId("");
    props.addEventVisible();
  };
  const getSingleBlog = (passedBlog, eventId) => {
    setSingleBlog(passedBlog);
    setEventId(eventId);
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
        <Blogs
          getSingleBlog={getSingleBlog}
          child1Method_ref={child1Method_ref}
        />
      </div>
      <Modal
        open={props.addEventBox}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddEvent
          onClose={handleClose}
          singleBlog={singleBlog}
          eventId={eventId}
          child1Method_ref={child1Method_ref}
        />
      </Modal>
      <Footer />
    </React.Fragment>
  );
};

const MapStateToProps = (state) => {
  return { addEventBox: state.addEventBox };
};

const MapDispatchToProps = (dispatch) => {
  return {
    addEventHidden: () => dispatch(addEventHidden()),
    addEventVisible: () => dispatch(addEventVisible()),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Event);

// export default Event;
