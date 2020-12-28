import React, { useState } from "react";
import "./LandingPage.css";
import Modal from "@material-ui/core/Modal";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Blogs from "./Blogs";
import Footer from "./Footer";
import { useHistory } from "react-router";
import firebase from "../firebase";;

function LandingPage(props) {
  const [open, setOpen] = useState(false);
  const [isLoginPopup, setLoginPopup] = useState(true);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    setLoginPopup(true);
  };
  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  //set login or register popup form open
  const handlePopup = (popupValue) => {
    setLoginPopup(popupValue);
  };
  //if user is login state, redirect to users' login page
  if (firebase.getCurrentUsername()) {
    history.push("/home");
    return null;
  }
  return (
    <React.Fragment>
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
        {isLoginPopup ? (
          <Login onClose={handleClose} handlePopup={handlePopup} />
        ) : (
          <Register onClose={handleClose} handlePopup={handlePopup} />
        )}
      </Modal>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            Events Page
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <a class="nav-link" href="/" onClick={handleOpen}>
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {props.history.location.state &&
        props.history.location.state.fromHome && (
          <p className="error-message">Please Sign in</p>
        )}
      <Blogs />
      <Footer />
    </React.Fragment>
  );
}

export default LandingPage;
