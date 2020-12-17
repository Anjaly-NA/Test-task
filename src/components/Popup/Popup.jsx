import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
const Popup = (props) => {
    const history = useHistory();
    const submitForm = (values) => {
        console.log(values);
        // history.push('/home');
    };
    const handleForgot = () => {
    }
    const { open,setOpen } = props;
    return (
        <Dialog open={open} onClose={setOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                content
            </DialogContent>
        </Dialog>
    );
};
export default Popup;