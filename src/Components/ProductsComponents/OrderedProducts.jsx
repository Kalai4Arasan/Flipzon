import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import Axios from 'axios';
import Loading from './Loading';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Pending from './Pending';
import Shipped from './Shipped';
import Canceled from './Canceled';
class OrderedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orderedData:null,
            isLoading:true,
            userData:JwtDecode(sessionStorage.getItem('User'))
         }
    }
    componentDidMount(){
        const User={"uid":this.state.userData.id}
        Axios.post("http://localhost:4200/orderedProducts",{User}).then((res)=>{
            if(res.data.length>0){
                this.setState({orderedData:res.data})
            }
            this.setState({isLoading:false})
        })
    }

    getProduct=()=>{
        const User={"uid":this.state.userData.id}
        Axios.post("http://localhost:4200/orderedProducts",{User}).then((res)=>{
            if(res.data.length>0){
                this.setState({orderedData:res.data})
            }
            this.setState({isLoading:false})
        })
    }
    render() { 
        if(!sessionStorage.getItem("User")){
            return <Redirect to="/login"/>
        }
        if(this.state.isLoading===true){
            return <Loading/>
        } 
        return ( 
            <div class="animate__animated animate__fadeIn" style={{marginTop:'4rem'}}>
                <h3>Your Orders:</h3><br/>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <Link type="button" to="/pending" class="btn btn-info">Pending</Link>
                    <Link type="button" to="/shipped" class="btn btn-info">Shipped</Link>
                    <Link type="button" to="/canceled" class="btn btn-info">Canceled</Link>
                </div>
                <hr/>
                <Switch>
                    <Route exact path="/orders">
                        <Pending data={this.state.orderedData!=null?this.state.orderedData:[]} get={this.getProduct}/>
                    </Route>
                    <Route exact path="/pending">
                        <Pending  data={this.state.orderedData!=null?this.state.orderedData:[]} get={this.getProduct}/>
                    </Route>
                    <Route exact path="/shipped">
                        <Shipped data={this.state.orderedData!=null?this.state.orderedData:[]} get={this.getProduct}/>
                    </Route>
                    <Route exact path="/canceled">
                        <Canceled data={this.state.orderedData!=null?this.state.orderedData:[]} get={this.getProduct}/>
                    </Route>
                </Switch>

            </div>
        );
    }
}
 
export default OrderedProducts;