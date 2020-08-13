import React, { Component } from 'react';
import "./Auth.css"
import Logo from '../../asserts/logo/HomeLogo.png'
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class="wrapper" style={{marginTop:'10%'}}>
            <div id="formContent">

                <div class="" style={{marginTop:'1rem'}}>
                <h3><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</h3>
                </div>
                <form>
                <input type="text" id="username" class="" name="username" placeholder="Username"/>
                <input type="text" id="password" class="" name="password" placeholder="Password"/>
                <input type="submit" class="" value="LogIn"/>
                </form>
                <div id="formFooter">
                <small>Create Account <Link to="/register">click here</Link></small><br/>
                <Link style={{fontSize:'13px'}} to="/forgotpassword">Forgot Password?</Link><br/>
                <Link style={{fontSize:'13px'}} to="/"><i class="fa fa-home"></i> Home</Link>
                </div>

            </div>
            </div>
         );
    }
}
 
export default Login;