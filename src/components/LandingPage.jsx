import React, { useState } from 'react';
import './LandingPage.css';
import Modal from '@material-ui/core/Modal';
import Login from './Login/Login';
import Popup from './Popup/Popup';
import Register from './Register/Register';
import Blogs from './Blogs';

function LandingPage() {
  const [open, setOpen] = useState(false);
  const [isLoginPopup, setLoginPopup] = useState(true);
  const handleClose = () => {
    setOpen(false)
    setLoginPopup(true);
  }
  const handleOpen = (event) => {
    event.preventDefault()
    setOpen(true)
  }
  const handlePopup = (popupValue) => {
    setLoginPopup(popupValue);
  }
  return (
    <React.Fragment>
      {/* <Popup open={open} setOpen={setOpen}></Popup> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isLoginPopup ? <Login onClose={handleClose} handlePopup={handlePopup} /> :
          <Register onClose={handleClose} handlePopup={handlePopup} />}
      </Modal>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="">Blogs Page</a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <a className="nav-link" href="" onClick={(e) => e.preventDefault()}>
                Home
              <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item ">
              <a class="nav-link" href="" onClick={handleOpen}>Sign In</a>
            </li>
          </ul>
        </div>
      </nav>
      <Blogs />
    </React.Fragment>
  );
}

export default LandingPage;