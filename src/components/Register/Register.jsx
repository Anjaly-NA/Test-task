import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";
import ConfirmationPopup from "../common/ConfirmationPopup";

const phoneRegExp = /((\+*)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}/;
//validation for registration
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Invalid phone number"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Too short - 6 chars minimum"),
  acceptTerms: Yup.bool()
    .oneOf([true], "Accept Terms & Conditions is required")
    .required(),
});

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  acceptTerms: false,
};

const Registration = (props) => {
  const [registerResponse, setRegisterResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  //registering the user to firebase
  async function submitForm(values) {
    try {
      await firebase.register(
        values.firstName,
        values.lastName,
        values.phoneNumber,
        values.acceptTerms,
        values.email,
        values.password
      );
      setRegisterResponse(true);
      setResponseMessage("Registation Successful. Logged in Now");
    } catch (error) {
      setRegisterResponse(true);
      setResponseMessage(error.message);
    }
  }
  const handleMessage = () => {
    setRegisterResponse(false);
    props.onClose();
  };
  const { onClose, handlePopup } = props;
  return (
    <React.Fragment>
      <ConfirmationPopup
        response={registerResponse}
        handleOk={handleMessage}
        responseMessage={responseMessage}
        okButtonText="OK"
      />
      <Formik
        initialValues={initialValues}
        // validate={validate}
        onSubmit={submitForm}
        validationSchema={SignUpSchema}
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
          } = formik;
          return (
            <section className="container">
              <section className="row justify-content-center">
                <section className="bg col-lg-9">
                  <form className="form-container" onSubmit={handleSubmit}>
                    <h4>
                      Register Here
                      <button type="button" className="close" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </h4>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.firstName && touched.firstName
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                          />
                          {errors.firstName && touched.firstName ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.firstName}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              *Mandatory field.
                            </small>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.lastName && touched.lastName
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                          />
                          {errors.lastName && touched.lastName ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.lastName}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              *Mandatory field.
                            </small>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.phoneNumber && touched.phoneNumber
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                          />
                          {errors.phoneNumber && touched.phoneNumber ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.phoneNumber}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              *Mandatory field.
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <input
                            type="email"
                            aria-describedby="emailHelp"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                          />
                          {errors.email && touched.email ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.email}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              We'll never share your email.
                            </small>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.password && touched.password
                                ? "is-invalid form-control"
                                : "form-control"
                            }
                          />
                          {errors.password && touched.password ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.password}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              Minimum 6 characters.
                            </small>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            value={values.acceptTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // className={errors.acceptTerms && touched.acceptTerms ?
                            //     "input-error" : null}
                            className={
                              "form-check-input " +
                              (errors.acceptTerms && touched.acceptTerms
                                ? " is-invalid"
                                : "")
                            }
                          />
                          {errors.acceptTerms && touched.acceptTerms ? (
                            <small id="emailHelp" className="invalid-feedback">
                              {errors.acceptTerms}
                            </small>
                          ) : (
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              Accept terms and conditions.
                            </small>
                          )}
                        </div>
                      </div>
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
                      Submit
                    </button>
                    <div className="form-group">
                      <p
                        className="text-center pointer"
                        onClick={() => handlePopup(true)}
                      >
                        Sign In Here
                      </p>
                    </div>
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
export default Registration;
