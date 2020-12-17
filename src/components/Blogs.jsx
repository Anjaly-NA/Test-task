import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const eventRef = firebase.getBlogs();
        eventRef.on('value', (snapshot) => {
            const blog = snapshot.val()
            const blogs = []
            for (let id in blog) {
                blogs.push(blog[id])
            }
            setBlogs(blogs)
        })
    }, [])
    return (
        <React.Fragment>
            <div className="container">

                <div className="row">

                    <div className="col-md-8">

                        <h1 className="my-4">Related Blogs
                        </h1>

                        {blogs && blogs.map((blog) => (
                            <div className="card mb-4">
                                <img className="card-img-top" src={blog.imageUrl} alt="Card image cap" />
                                <div className="card-body">
                                    <h2 className="card-title">{blog.postTitle}</h2>
                                    <p className="card-text">{blog.description}</p>
                                    {/* <a href="#" className="btn btn-primary">Read More &rarr;</a> */}
                                </div>
                                <div className="card-footer text-muted">
                                    Posted on {blog.date}
                                    {/* <a href="#">Start Bootstrap</a> */}
                                </div>
                            </div>
                        ))}
                        <ul className="pagination justify-content-center mb-4">
                            <li className="page-item">
                                <a className="page-link" href="#">&larr; Older</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link" href="#">Newer &rarr;</a>
                            </li>
                        </ul>

                    </div>

                    <div className="col-md-4">
                        <div className="card my-4">
                            <h5 className="card-header">Categories</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul className="list-unstyled mb-0">
                                            <li>
                                                <a href="#">Web Design</a>
                                            </li>
                                            <li>
                                                <a href="#">HTML</a>
                                            </li>
                                            <li>
                                                <a href="#">Freebies</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul className="list-unstyled mb-0">
                                            <li>
                                                <a href="#">JavaScript</a>
                                            </li>
                                            <li>
                                                <a href="#">CSS</a>
                                            </li>
                                            <li>
                                                <a href="#">Tutorials</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card my-4">
                            <h5 className="card-header">Side Widget</h5>
                            <div className="card-body">
                                You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
  </div>
                        </div>

                    </div>

                </div>

            </div>

            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2020</p>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default Blogs;