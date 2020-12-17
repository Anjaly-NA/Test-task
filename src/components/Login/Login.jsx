import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import './Login.css';
import firebase from '../../firebase';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
});

const initialValues = {
    email: "",
    password: "",
};
const Form = (props) => {
    const history = useHistory();
    async function submitForm(values) {
        // console.log(values.email,values.password);
        // history.push('/home');
        try {
            await firebase.login(values.email, values.password)
            history.push('/home')
        }
        catch (error) {
            alert(error.message)
        }
    };
    const { onClose, handlePopup } = props;
    return (
        <React.Fragment>
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
                        dirty
                    } = formik;
                    return (
                        <section className='container'>
                            <section className='row justify-content-center align-items-center'>
                                <section className='col-sm-6 col-md-6 bg col-lg-4'>
                                    <form className='form-container' onSubmit={handleSubmit}>
                                        <h4>Login Here
                                        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                        </h4>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">
                                                Email address
                                            </label>
                                            <input type="email" aria-describedby="emailHelp"
                                                name="email"
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.email && touched.email ?
                                                    "is-invalid form-control" : 'form-control'}
                                            />
                                            {errors.email && touched.email ? <small id="emailHelp" className="invalid-feedback">{errors.email}</small> : <small id="emailHelp" className="form-text text-muted">
                                                We'll never share your email.
                                            </small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">
                                                Password
                                            </label>
                                            <input type="password"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.password && touched.password ?
                                                    "is-invalid form-control" : 'form-control'}
                                            />
                                            {errors.password && touched.password ? <small id="emailHelp" className="invalid-feedback">{errors.password}</small> : <small id="emailHelp" className="form-text text-muted">
                                                Minimum 6 characters.
                                            </small>}
                                        </div>
                                        <button type="submit"
                                            className={dirty && isValid ? "btn btn-primary btn-block" : "btn btn-primary btn-block disabled-btn"}
                                            disabled={!(dirty && isValid)}>
                                            Submit
                                        </button>
                                        <div className="form-group">
                                            <p className="text-center pointer" onClick={() => handlePopup(false)}>Register Here</p>
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
export default Form;