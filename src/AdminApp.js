import React, { Component } from 'react';
import Logo from './asserts/logo/HomeLogo.png'
import JwtDecode from 'jwt-decode';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import './App.css'
import Brands from './Components/AdminComponents/Brands';
import Categories from './Components/AdminComponents/Categories';
import Products from './Components/AdminComponents/Products';
import Orders from './Components/AdminComponents/Orders';
import './Components/AdminComponents/AdminComponents.css'
import AddProducts from './Components/AdminComponents/AddProducts';
class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            adminData:sessionStorage.getItem('Admin')!=null? JwtDecode(sessionStorage.getItem('Admin')):null
         }
    }
    render() { 
        if(!sessionStorage.getItem('Admin')){
            return <Redirect to="adminLogin"/>
        }

        return ( 
            <>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <a class="navbar-brand text-white " ><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon<span style={{fontSize:'10px',marginLeft:'1px'}} class="badge badge-primary badge-pill ">admin</span></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#content" aria-controls="content" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="content">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-itemtext-white">
                        <Link class="nav-link text-white" to="/categories">
                            Categories
                        </Link>
                    </li>
                    <li class="nav-itemtext-white">
                        <Link class="nav-link text-white" to="/brands">
                            Brands
                        </Link>
                    </li>
                    <li class="nav-itemtext-white">
                        <Link class="nav-link text-white" to="/products">
                            Products
                        </Link>
                    </li>
                    <li class="nav-itemtext-white">
                        <Link class="nav-link text-white" to="/orderedProducts">
                            Orders
                        </Link>
                    </li>
                    </ul>
                    <ul class="navbar-nav">
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.adminData.admin_name}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " style={{cursor:'pointer'}} onClick={()=>{sessionStorage.removeItem("Admin");this.setState({adminData:null})}}>Logout</a>
                        </div>
                    </li>
                    </ul>
                </div>
                </nav>
                <div class="container">
                <Switch>
                    <Route exact path="/brands">
                        <Brands/>
                    </Route>
                    <Route exact path="/categories">
                        <Categories/>
                    </Route>
                    <Route exact path="/products">
                        <Products/>
                    </Route>
                    <Route exact path="/orderedProducts">
                        <Orders/>
                    </Route>
                    <Route exact path="/addProducts">
                        <AddProducts/>
                    </Route>
                    <Route exact path="/ordersCategory">
                        <Orders/>
                    </Route>
                </Switch>
                </div>
                </>
            );
    }
}
 
export default AdminApp;