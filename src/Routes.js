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
                <Route exact path="/smartphones">
                    <App/>
                </Route>
                <Route exact path="/laptops">
                    <App/>
                </Route>
                <Route exact path="/men">
                    <App/>
                </Route>
                <Route exact path="/women">
                    <App/>
                </Route>
                <Route exact path="/kids">
                    <App/>
                </Route>
                <Route exact path="/appliances">
                    <App/>
                </Route>
                <Route exact path="/singleproduct">
                    <App/>
                </Route>
                <Route exact path="/buyproduct">
                    <App/>
                </Route>
                <Route exact path="/successPayment">
                    <App/>
                </Route>
                <Route exact path="/cart">
                    <App/>
                </Route>
                <Route exact path="/orders">
                    <App/>
                </Route>
                <Route exact path="/pending">
                    <App/>
                </Route>
                <Route exact path="/shipped">
                    <App/>
                </Route>
                <Route exact path="/canceled">
                    <App/>
                </Route>
            </Switch>
        </Router>
    );
}
export default Routes;