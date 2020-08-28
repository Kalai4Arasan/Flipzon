import React from 'react';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import AdminApp from './AdminApp';
import App from './App';
import Register from './Components/AuthComponents/Register';
import Login from './Components/AuthComponents/Login';
import AdminLogin from './Components/AuthComponents/AdminLogin';
const Routes=()=>{
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App/>
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
                <Route exact path="/addReview">
                    <App/>
                </Route>


                <Route exact path="/adminHome">
                    <AdminApp/>
                </Route>
                <Route exact path="/adminLogin">
                    <AdminLogin/>
                </Route>
                <Route exact path="/brands">
                    <AdminApp/>
                </Route>
                <Route exact path="/categories">
                    <AdminApp/>
                </Route>
                <Route exact path="/products">
                    <AdminApp/>
                </Route>
                <Route exact path="/orderedProducts">
                    <AdminApp/>
                </Route>
                <Route exact path="/addProducts">
                    <AdminApp/>
                </Route>
                <Route exact path="/ordersCategory">
                    <AdminApp/>
                </Route>
            </Switch>
        </Router>
    );
}
export default Routes;