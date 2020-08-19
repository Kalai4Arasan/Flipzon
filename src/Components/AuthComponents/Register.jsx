import React, { Component } from 'react';
import "./Auth.css"
import Logo from '../../asserts/logo/HomeLogo.png'
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:null,
            email:null,
            password:null,
            cpassword:null,
            address:null,
            phone:null,
            finalError:null,
            errors:{
                name:null,
                email:null,
                password:null,
                cpassword:null,
                address:null,
                phone:null
            }
         }
    }
    handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        switch(name){
            case "name":
                this.state.errors.name=value.length==0?"name field must be required":""
                break
            case "email":
                this.state.errors.email=value.length==0?"email field must be required":""
                break
            case "password":
                this.state.errors.password=value.length==0?"Password Field Must be filled":value.length<6?"Password must be greater than 6":""
                break
            case "cpassword":
                this.state.errors.cpassword=value.length==0?"Password Field Must be filled":value.length<6?"Password must be greater than 6":""
                break
            case "address":
                this.state.errors.address=value.length==0?"address field must be required":""
                break
            case "phone":
                this.state.errors.phone=value.length==0?"phone field must be required":""
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
        if(valid==true && this.state.password===this.state.cpassword){
            console.log(this.state)
            this.setState({finalError:null})
            const User={
                "name":this.state.name,
                "email":this.state.email,
                "password":this.state.password,
                "address":this.state.address,
                "phone":this.state.phone
            }
            Axios.post("http://localhost:4200/register",{User}).then((res)=>{
                if(res.data.length>0){
                sessionStorage.setItem("User",res.data)
                this.setState({redirect:true})
                }
                else{
                    this.setState({finalError:"Username or Email already exist"})
                }
            })
        }
        else{
            this.setState({finalError:"Invalid Register Credentials."})
        }
    }
    render() { 
        if(this.state.redirect==true){
            return <Redirect to="/"/>
        }
        return ( 
            <div class="wrapper animate__animated animate__fadeIn" style={{marginTop:'2%'}}>
            <div id="formContent">

                <div  style={{marginTop:'1rem'}}>
                <h3><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                <input class="input" style={{marginTop:'1rem'}} onChange={this.handleChange} type="text" name="name" placeholder="Username"/>
                {this.state.errors.name!=null && this.state.errors.name.length>0? <span><br/><small class="text-danger">{this.state.errors.name}</small><br/></span>:null}
                <input class="input" style={{marginTop:'1rem'}} onChange={this.handleChange} type="email"  name="email" placeholder="Email Address"/>
                {this.state.errors.email!=null && this.state.errors.email.length>0? <span><br/><small class="text-danger">{this.state.errors.email}</small><br/></span>:null}
                <input class="input" style={{marginTop:'1rem'}} onChange={this.handleChange} type="password"  name="password" placeholder="Password"/>
                {this.state.errors.password!=null && this.state.errors.password.length>0? <span><br/><small class="text-danger">{this.state.errors.password}</small><br/></span>:null}
                <input class="input" style={{marginTop:'1rem'}} onChange={this.handleChange} type="password"  name="cpassword" placeholder="Confirm Password"/>
                {this.state.errors.cpassword!=null && this.state.errors.cpassword.length>0? <span><br/><small class="text-danger">{this.state.errors.cpassword}</small><br/></span>:null}
                <textarea class="textarea" style={{marginTop:'1rem'}} onChange={this.handleChange} type="text" name="address" placeholder="Address"/>
                {this.state.errors.address!=null && this.state.errors.address.length>0? <span><br/><small class="text-danger">{this.state.errors.address}</small><br/></span>:null}
                <input class="input" style={{marginTop:'1rem'}} onChange={this.handleChange} type="text"  name="phone" placeholder="Mobile phone"/>
                {this.state.errors.phone!=null && this.state.errors.phone.length>0? <span><br/><small class="text-danger">{this.state.errors.phone}</small><br/></span>:null}
                {this.state.finalError!=null && this.state.finalError.length>0? <span><br/><small class="text-danger">{this.state.finalError}</small></span>:null}
                <input style={{marginTop:'1rem'}}  type="submit" class="btn btn-primary" value="Register"/>
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