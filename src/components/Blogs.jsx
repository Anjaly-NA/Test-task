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
} from "../redux";
import { connect } from "react-redux";
import CircularSpin from "./common/CircularSpin";
import Button from "@material-ui/core/Button";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 2;
  const [pageCount, setpageCount] = useState(0);
  const [spinner, setSpinner] = useState(true);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
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
        // for (let id in blog) {
        //   blog.eventid = id;
        //   blogs.push(blog[id]);
        // }
        setBlogs(blogs);
        setpageCount(Math.ceil(blogs.length / itemPerPage));
        setSpinner(false);
      });
    }
    //if user is not logged in, on landing page show every users' events
    else {
      eventRef.once("value").then(function (snapshot) {
        const blogs = [];
        snapshot.forEach(function (childSnapshot) {
          var blog = childSnapshot.val();
          // for (let id in blog) {
          //   blogs.push(blog[id]);
          // }
          let keys = Object.entries(blog);
          keys.forEach(([key, value]) => {
            blogs.push({ eventid: key, items: value });
          });
        });
        setBlogs(blogs);
        setpageCount(Math.ceil(blogs.length / itemPerPage));
        setSpinner(false);
      });
    }
  }, []);

  const handleEdit = async (eventId) => {
    props.addEventVisible();
    const eventRef = await firebase.editEvent(eventId);
    eventRef.on("value", (snapshot) => {
      const blog = snapshot.val();
      var mimeString = blog.file.split(',')[0].split(':')[1].split(';')[0];
      console.log(mimeString,'nlog')
      props.getSingleBlog(blog,eventId);
    });
  };

  const indexOfLastTodo = currentPage * itemPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
  const currentItems = blogs.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row min-vh-100">
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
                              <Button
                                size="medium"
                                variant="contained"
                                onClick={() => handleEdit(blog.eventid)}
                                className="btn-edit"
                              >
                                Edit Event
                              </Button>
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
  };
};

export default connect(MapStateToProps, MapDispatchToProps)(Blogs);
