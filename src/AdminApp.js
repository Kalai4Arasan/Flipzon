import React, { Component } from 'react';
import Logo from './asserts/logo/HomeLogo.png'
class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <a class="navbar-brand text-white " href="#"><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon<span style={{fontSize:'10px',marginLeft:'1px'}} class="badge badge-primary badge-pill ">admin</span></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Products
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item " href="#">Action</a>
                        <a class="dropdown-item " href="#">Another action</a>
                        </div>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                </nav>
            );
    }
}
 
export default AdminApp;