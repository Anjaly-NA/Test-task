import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Pagination from "@material-ui/lab/Pagination";
import NoData from "./common/NoData";
import {
  setSpinnerFalse,
  setSpinnerTrue,
  addEventHidden,
  addEventVisible,
  unsetEventValue,
  setEventValue,
  setBlogCount,
} from "../redux";
import { connect } from "react-redux";
import CircularSpin from "./common/CircularSpin";
import SearchBar from "./common/SearchBar";
import Button from "@material-ui/core/Button";
import ConfirmationPopup from "./common/ConfirmationPopup";
import Sort from "./common/Sort";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 2;
  const [pageCount, setpageCount] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [eventId, setEventId] = useState(null);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    // props.child1Method_ref.current = listAllEvent;
    listAllEvent();
  }, []);

  const listAllEvent = () => {
    const eventRef = firebase.getEvents();
    //listing the events for particular user if the user is logged in
    if (firebase.getCurrentUsername()) {
      eventRef.on("value", (snapshot) => {
        const blog = snapshot.val();
        const blogs = [];
        if (blog !== null) {
          let keys = Object.entries(blog);
          keys.forEach(([key, value]) => {
            blogs.push({ eventid: key, items: value });
          });
        }
        setEventList(blogs);
      });
    }
    //if user is not logged in, on landing page show every users' events
    else {
      eventRef.once("value").then(function (snapshot) {
        const blogs = [];
        snapshot.forEach(function (childSnapshot) {
          var blog = childSnapshot.val();
          let keys = Object.entries(blog);
          keys.forEach(([key, value]) => {
            blogs.push({ eventid: key, items: value });
          });
        });
        setEventList(blogs);
      });
    }
  };
  const setEventList = (blogs) => {
    setBlogs(blogs);
    setCurrentPage(1);
    setpageCount(Math.ceil(blogs.length / itemPerPage));
    setSpinner(false);
    props.setBlogCount(blogs.length);
  };

  const handleEdit = async (eventId) => {
    props.addEventVisible();
    const eventRef = await firebase.editEvent(eventId);
    eventRef.on("value", (snapshot) => {
      const blog = snapshot.val();
      props.getSingleBlog(blog, eventId);
    });
  };
  const handleDelete = (eventIdPassed) => {
    setEventId(eventIdPassed);
    setDeleteConfirm(true);
    setDeleteMessage("Are you sure want to delete?");
  };
  const handleYes = () => {
    firebase.deleteEvent(eventId);
    listAllEvent();
    setDeleteConfirm(false);
  };
  const handleNo = () => {
    setDeleteConfirm(false);
  };
  const setSortData = (passedSortData) => {
    const eventRef = firebase.sortEvents(passedSortData);
    if (firebase.getCurrentUsername()) {
      eventRef.on("value", (snapshot) => {
        const blogs = [];
        snapshot.forEach(function (child) {
          blogs.push({ eventid: child.key, items: child.val() });
        });
        setEventList(blogs);
      });
    }
  };
  const setEventFromChildToParent = (passedEventName) => {
    if (passedEventName === "") {
      listAllEvent();
    } else {
      searchEventDetails(passedEventName);
    }
  };
  const searchEventDetails = (passedEventName) => {
    const eventRef = firebase.searchEvent(passedEventName);
    if (firebase.getCurrentUsername()) {
      eventRef.on("value", (snapshot) => {
        const blog = snapshot.val();
        const blogs = [];
        if (blog !== null) {
          let keys = Object.entries(blog);
          keys.forEach(([key, value]) => {
            blogs.push({ eventid: key, items: value });
          });
        }
        setEventList(blogs);
      });
    }
  };

  const indexOfLastTodo = currentPage * itemPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
  const currentItems = blogs.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <React.Fragment>
      <ConfirmationPopup
        response={deleteConfirm}
        handleYes={handleYes}
        handleNo={handleNo}
        responseMessage={deleteMessage}
        yesButtonText="Yes"
        noButtonText="No"
      />
      <div className="container">
        <div className="row min-vh-100">
          <div>
            {firebase.getCurrentUsername() && (
              <>
                <SearchBar
                  events={blogs}
                  setEventFromChildToParent={setEventFromChildToParent}
                />
                <Sort setSortData={setSortData} />
              </>
            )}
          </div>
          <div className="col-md-8">
            <h1 className="my-4">Related Events</h1>
            {spinner ? (
              <CircularSpin />
            ) : (
              <>
                {currentItems && currentItems.length > 0 ? (
                  <>
                    {currentItems &&
                      currentItems.map((blog, key) => (
                        <div className="card mb-4">
                          <img
                            className="card-img-top"
                            src={
                              blog.items.file
                                ? blog.items.file
                                : "/images/logo.svg"
                            }
                            alt="event"
                            height="300px"
                          />
                          <div className="card-body">
                            <h2 className="card-title">{blog.items.title}</h2>
                            <p className="card-text">
                              {blog.items.description}
                            </p>
                          </div>
                          <div className="card-footer text-muted">
                            Event date {blog.items.date}
                            {firebase.getCurrentUsername() && (
                              <div className="btn-container">
                                <Button
                                  size="medium"
                                  variant="contained"
                                  onClick={() => handleEdit(blog.eventid)}
                                  className="btn-edit"
                                >
                                  Edit Event
                                </Button>
                                <Button
                                  size="medium"
                                  variant="contained"
                                  onClick={() => handleDelete(blog.eventid)}
                                  className="btn-edit"
                                >
                                  Delete Event
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    <div className="pagination-container">
                      <p>Page: {currentPage}</p>
                      <Pagination
                        count={pageCount}
                        page={currentPage}
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        pageSize={2}
                        color="primary"
                      />
                    </div>
                  </>
                ) : (
                  <NoData />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const MapStateToProps = (state) => {
  return {
    spinnerValue: state.spinnerValue,
    addEventBox: state.addEventBox,
    editEventValue: state.editEventValue,
    blogCount: state.blogCount,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    setSpinnerFalse: () => dispatch(setSpinnerFalse()),
    setSpinnerTrue: () => dispatch(setSpinnerTrue()),
    addEventHidden: () => dispatch(addEventHidden()),
    addEventVisible: () => dispatch(addEventVisible()),
    setEventValue: (value) => dispatch(setEventValue(value)),
    unsetEventValue: () => dispatch(unsetEventValue()),
    setBlogCount: (value) => dispatch(setBlogCount(value)),
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Blogs);
