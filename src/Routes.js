import React from 'react';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import AdminApp from './AdminApp';
import App from './App';
import Register from './Components/AuthComponents/Register';
import Login from './Components/AuthComponents/Login';
const Routes=()=>{
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App/>
                </Route>
                <Route exact path="/admin">
                    <AdminApp/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/offerzone">
                    <App/>
                </Route>
            </Switch>
        </Router>
    );
}
export default Routes;