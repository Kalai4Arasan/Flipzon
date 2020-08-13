import React, { Component } from 'react';
import './App.css';
import Logo from './asserts/logo/HomeLogo.png'
import Fire from './asserts/logo/fire.png'
import { Switch, Route, Link } from 'react-router-dom';
import OfferZone from './Components/ProductsComponents/OfferZone';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    setAuth=()=>{
        if(true){
        return (
        <>
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Account
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link class="dropdown-item " to="/login">Login</Link>
        <Link class="dropdown-item " to="/register">Register</Link>
        </div>
        </>
        )
        }
        else{
            return(
                <>
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item " to="/profile">Profile</Link>
                <Link class="dropdown-item " to="/logout">Logout</Link>
                </div>
                </> 
            )
        }
    }
    render() { 
        return ( 
            <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <a class="navbar-brand text-white " href="#"><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i class="fa fa-bars text-white"></i></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto links">
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Electronics
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " href="#">Action</a>
                        <a class="dropdown-item " href="#">Another action</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tv&Appliances
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " href="#">Action</a>
                        <a class="dropdown-item " href="#">Another action</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Men
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " href="#">Action</a>
                        <a class="dropdown-item " href="#">Another action</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Women
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " href="#">Action</a>
                        <a class="dropdown-item " href="#">Another action</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <Link class="nav-link text-white" to="/offerzone">
                        OfferZone<img style={{display:'flex',marginTop:'-30px',marginLeft:'-30px'}} src={Fire} height="50" width="130"/>
                        </Link>
                    </li>
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                    <ul class="navbar-nav links">
                    <li class="nav-item dropdown text-white">
                        {this.setAuth()}
                    </li>
                    </ul>
                    </div>
                </div>
                </nav>
                <Switch>
                    <Route exact path="/offerzone">
                        <OfferZone/>
                    </Route>
                </Switch>
            </div>
            );
    }
}
 
export default App;