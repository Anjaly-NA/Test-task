import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Pagination from "@material-ui/lab/Pagination";
import NoData from "./common/NoData";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(2);
  const [pageCount, setpageCount] = useState(0);
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
        for (let id in blog) {
          blogs.push(blog[id]);
        }
        setBlogs(blogs);
        setpageCount(Math.ceil(blogs.length / itemPerPage));
      });
    } 
    //if user is not logged in, on landing page show every users' events
    else {
      eventRef.once("value").then(function (snapshot) {
        const blogs = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var blog = childSnapshot.val();
          for (let id in blog) {
            blogs.push(blog[id]);
          }
        });
        setBlogs(blogs);
        setpageCount(Math.ceil(blogs.length / itemPerPage));
      });
    }
  }, []);

  const indexOfLastTodo = currentPage * itemPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
  const currentItems = blogs.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row min-vh-100">
          <div className="col-md-8">
            <h1 className="my-4">Related Events</h1>
            {currentItems && currentItems.length > 0 ? (
              <>
                {currentItems &&
                  currentItems.map((blog) => (
                    <div className="card mb-4">
                      {/* <img className="card-img-top" src={blog.imageUrl} alt="Card image cap" /> */}
                      <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p className="card-text">{blog.description}</p>
                      </div>
                      <div className="card-footer text-muted">
                        Event date {blog.date}
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Blogs;
