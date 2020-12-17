import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import firebase from '../../firebase';

const SignUpSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(3, 'Too short'),
    description: Yup.string().min(3, 'Too short')
        .required("Description is required"),
    date: Yup.date().min(new Date(), 'Past dates cannot be allowed').required('Choose a valid date')
});

const initialValues = {
    title: "",
    description: "",
    date: ''
};
const AddEvent = (props) => {
    const history = useHistory();
    // async 
    function submitForm(values) {
        try {
    //         await 
            firebase.addEvents(values.title, values.description, values.date)
        }
        catch (error) {
            alert(error.message)
        }
        props.onClose();
    };
    const { onClose } = props;
    return (
        <React.Fragment>
            <Formik
                initialValues={initialValues}
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
                                        <h4>Add Event
                                        <button type="button" className="close" onClick={onClose}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                        </h4>
                                        <div className="form-group">
                                            <label htmlFor="title">
                                                Title
                                            </label>
                                            <input type="text" aria-describedby="titleHelp"
                                                name="title"
                                                id="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.title && touched.title ?
                                                    "is-invalid form-control" : 'form-control'}
                                            />
                                            {errors.title && touched.title ? <small id="emailHelp" className="invalid-feedback">{errors.title}</small> : <small id="emailHelp" className="form-text text-muted">
                                                Enter title.
                                            </small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <input type="text"
                                                name="description"
                                                id="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.description && touched.description ?
                                                    "is-invalid form-control" : 'form-control'}
                                            />
                                            {errors.description && touched.description ? <small id="emailHelp" className="invalid-feedback">{errors.description}</small> : <small id="emailHelp" className="form-text text-muted">
                                                Enter description about the event.
                                            </small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">
                                                Date
                                            </label>
                                            <input type="date"
                                                name="date"
                                                id="date"
                                                value={values.date}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.date && touched.date ?
                                                    "is-invalid form-control" : 'form-control'}
                                            />
                                            {errors.date && touched.date ? <small id="emailHelp" className="invalid-feedback">{errors.date}</small> : <small id="emailHelp" className="form-text text-muted">
                                                Enter event of Event.
                                            </small>}
                                        </div>
                                        <button type="submit"
                                            className={dirty && isValid ? "btn btn-primary btn-block" : "btn btn-primary btn-block disabled-btn"}
                                            disabled={!(dirty && isValid)}>
                                            Add Event
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
export default AddEvent;