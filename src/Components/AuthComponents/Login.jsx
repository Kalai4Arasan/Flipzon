import React, { Component } from 'react';
import "./Auth.css"
import Logo from '../../asserts/logo/HomeLogo.png'
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:null,
            password:null,
            redirect:false,
            finalError:null,
            errors:{
                username:null,
                password:null
            }
         }
    }

    handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        console.log(name,value)
        switch(name){
            case "username":
            this.state.errors.username=value.length==0?"Username Field Must be filled":""
            break
            case "password":
            this.state.errors.password=value.length==0?"Password Field Must be filled":value.length<6?"Password must be greater than 6":""
            break
        }
        this.setState({[name]:value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        let valid=true
        for(let item in this.state.errors){
            if(this.state.errors[item]==null || this.state.errors[item].length>0){
                valid=false
            }
        }
        if(valid==true){
            const User={
                "username":this.state.username,
                "password":this.state.password
            }
            Axios.post("http://localhost:4200/login",{User}).then((res)=>{
                if(res.data.length>0){
                sessionStorage.setItem("User",res.data)
                this.setState({redirect:true})
                }
                else{
                    this.setState({finalError:"Invalid Username or Password"})
                }
            })
        }
    }
    render() { 
        if(this.state.redirect==true){
            return <Redirect to="/"/>
        }
        return ( 
            <div class="wrapper animate__animated animate__fadeIn" style={{marginTop:'10%'}}>
            <div id="formContent" >

                <div class="" style={{marginTop:'1rem'}}>
                <h3><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                <input class="input" type="text" onChange={this.handleChange} id="username" name="username" placeholder="Username"/><br/>
                {this.state.errors.username!=null && this.state.errors.username.length>0? <span><small class="text-danger">{this.state.errors.username}</small><br/></span>:null}
                <input class="input" type="password" onChange={this.handleChange} id="password" name="password" placeholder="Password"/><br/>
                {this.state.errors.password!=null && this.state.errors.password.length>0? <span><small class="text-danger">{this.state.errors.password}</small><br/></span>:null}
                {this.state.finalError!=null && this.state.finalError.length>0? <span><small class="text-danger">{this.state.finalError}</small><br/></span>:null}
                <input type="submit" class="btn btn-primary" value="LogIn"/>
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