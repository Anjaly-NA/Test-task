import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home/Home';
import { CircularProgress } from '@material-ui/core';
import firebase from './firebase';

const Routes = (props) => {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)
    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })
    return firebaseInitialized !== false ? (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/home" component={Home} />
            </Switch>
        </Router>
    ) : <div id='loader'><CircularProgress /></div>
}
export default Routes;