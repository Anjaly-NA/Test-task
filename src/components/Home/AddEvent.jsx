import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";
import ConfirmationPopup from "../common/ConfirmationPopup";
import { connect } from "react-redux";
import CircularSpin from "../common/CircularSpin";
import { setSpinnerFalse, setSpinnerTrue } from "../../redux";

//validations for the fields
const SignUpSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3, "Too short"),
  description: Yup.string()
    .min(3, "Too short")
    .required("Description is required"),
  date: Yup.date()
    .min(new Date(), "Past dates cannot be allowed")
    .required("Choose a valid date"),
  file: Yup.mixed().required(),
});

const initialValues = {
  title: "",
  description: "",
  date: "",
  file: null,
  inputFile: null,
};

const AddEvent = (props) => {
  const [eventAddResponse, setEventAddResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [displayImg, setDisplayImg] = useState(undefined);

  const handleDisplayImage = (event, setFieldValue) => {
    setFieldValue("file", event.target.files[0]);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setDisplayImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  /**
   * add event to particular user
   * @param {Object} values
   */
  const submitForm = async (values) => {
    props.setSpinnerTrue();
    const file = values.file;
    const fileUrl = await firebase.uploadImage(file.name, file);
    try {
      if (props.eventId) {
        firebase.updateEvent(
          values.title,
          values.description,
          values.date,
          fileUrl ? fileUrl : props.singleBlog.file,
          props.eventId
        );
      } else {
        firebase.addEvents(
          values.title,
          values.description,
          values.date,
          fileUrl,
          props.eventId
        );
      }
      props.setSpinnerFalse();
      setEventAddResponse(true);
      if (props.eventId) {
        setResponseMessage("Event Updated Successfully");
      } else {
        setResponseMessage("Event Added Successfully");
      }
      props.child1Method_ref.current();
    } catch (error) {
      setEventAddResponse(true);
      setResponseMessage(error.message);
      props.setSpinnerFalse();
    }
  };

  /**
   * Popup visible after adding event
   */
  const handleOk = () => {
    setEventAddResponse(false);
    props.onClose();
  };
  const { onClose } = props;
  return (
    <React.Fragment>
      <ConfirmationPopup
        response={eventAddResponse}
        handleOk={handleOk}
        responseMessage={responseMessage}
        okButtonText="OK"
      />
      <Formik
        initialValues={props.singleBlog || initialValues}
        onSubmit={submitForm}
        validationSchema={SignUpSchema}
        enableReinitialize
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
            setFieldValue,
          } = formik;
          return (
            <section className="container">
              <section className="row justify-content-center align-items-center">
                <section className="col-sm-6 col-md-6 bg col-lg-4 scroll-height">
                  <form className="form-container" onSubmit={handleSubmit}>
                    <h4>
                      {props.eventId ? "Edit Event" : "Add Event"}
                      <button type="button" className="close" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </h4>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        aria-describedby="titleHelp"
                        name="title"
                        id="title"
                        value={values.title}
                        // value={
                        //   props.singleBlog.title
                        //     ? props.singleBlog.title
                        //     : values.title
                        // }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.title && touched.title
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                      />
                      {errors.title && touched.title ? (
                        <small id="emailHelp" className="invalid-feedback">
                          {errors.title}
                        </small>
                      ) : (
                        <small id="emailHelp" className="form-text text-muted">
                          Enter title.
                        </small>
                      )}
                    </div>
                    {props.spinnerValue && <CircularSpin />}
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        // value={
                        //   props.singleBlog.description
                        //     ? props.singleBlog.description
                        //     : values.description
                        // }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.description && touched.description
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                      ></textarea>
                      {errors.description && touched.description ? (
                        <small id="emailHelp" className="invalid-feedback">
                          {errors.description}
                        </small>
                      ) : (
                        <small id="emailHelp" className="form-text text-muted">
                          Enter description about the event.
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={values.date}
                        // value={
                        //   props.singleBlog.date
                        //     ? props.singleBlog.date
                        //     : values.date
                        // }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.date && touched.date
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                      />
                      {errors.date && touched.date ? (
                        <small id="emailHelp" className="invalid-feedback">
                          {errors.date}
                        </small>
                      ) : (
                        <small id="emailHelp" className="form-text text-muted">
                          Enter date of Event.
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Image</label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        // value={displayImg ? displayImg : props.singleBlog.file}
                        // onChange={(event) => {
                        //   setFieldValue("file", event.target.files[0]);
                        // }}
                        onChange={(event) =>
                          handleDisplayImage(event, setFieldValue)
                        }
                        className={
                          errors.file && touched.file
                            ? "is-invalid form-control height-auto"
                            : "form-control height-auto"
                        }
                      />
                      {errors.file && touched.file ? (
                        <small id="emailHelp" className="invalid-feedback">
                          {errors.file}
                        </small>
                      ) : (
                        <small id="emailHelp" className="form-text text-muted">
                          Upload image.
                        </small>
                      )}
                      {(props.singleBlog.file || displayImg) && (
                        <img
                          src={displayImg ? displayImg : props.singleBlog.file}
                          alt="alter"
                          className="img-thumbnail mt-2"
                          height={100}
                          width={100}
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className={
                        dirty && isValid
                          ? "btn btn-primary btn-block"
                          : "btn btn-primary btn-block disabled-btn"
                      }
                      disabled={!(dirty && isValid)}
                    >
                      {props.eventId ? "Edit Event" : "Add Event"}
                    </button>
                  </form>
                </section>
              </section>
            </section>
          );
        }}
      </Formik>
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
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(AddEvent);

// export default AddEvent;
