import React, { Component } from 'react';
import "./Auth.css"
import Logo from '../../asserts/logo/HomeLogo.png'
import { Link } from 'react-router-dom';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class="wrapper" style={{marginTop:'5%'}}>
            <div id="formContent">

                <div  style={{marginTop:'1rem'}}>
                <h3><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</h3>
                </div>
                <form>
                <input style={{marginTop:'1rem'}} type="text" name="username" placeholder="Username"/>
                <input style={{marginTop:'1rem'}} type="email"  name="email" placeholder="Email Address"/>
                <input style={{marginTop:'1rem'}} type="password"  name="password" placeholder="Password"/>
                <input style={{marginTop:'1rem'}} type="password"  name="cpassword" placeholder="Confirm Password"/>
                <textarea style={{marginTop:'1rem'}} type="text" name="address" placeholder="Address"/>
                <input style={{marginTop:'1rem'}} type="number"  name="number" placeholder="Mobile Number"/>
                <input style={{marginTop:'1rem'}} type="submit" value="Register"/>
                </form>
                <div id="formFooter">
                <small>Already have an account <Link to="/login">click here</Link></small><br/>
                <Link style={{fontSize:'13px'}} to="/"><i class="fa fa-home"></i> Home</Link>
                </div>

            </div>
            </div>
         );
    }
}
 
export default Register;