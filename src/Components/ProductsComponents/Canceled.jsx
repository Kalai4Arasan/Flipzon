import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StockNotFound from '../../asserts/logo/emptyStock.png'
import Loading from './Loading';
import JwtDecode from 'jwt-decode';
import Axios from 'axios';
class Canceled extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            canceledData:null,
            isLoading:true,
            userData:JwtDecode(sessionStorage.getItem('User'))
         }
    }
    componentWillMount(){
        const User={"uid":this.state.userData.id}
        Axios.post("http://localhost:4200/canceledProducts",{User}).then((res)=>{
            if(res.data.length>0){
                this.setState({canceledData:res.data})
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
        if(this.state.canceledData==null || this.state.canceledData.length==0){
            return (
                <img style={{marginTop:'2rem',display:'block',width:'40%',marginLeft:'auto',marginRight:'auto'}} src={StockNotFound}/>
            )
        }
        return ( 
            <>
            <h5>Canceled Products:</h5>
            <table class="table mt-2 animate__animated animate__fadeIn">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">ProductImage</th>
                    <th scope="col">ProductName</th>
                    <th scope="col">DeliveryAddress</th>
                    <th scope="col">OrderedDate</th>
                    <th scope="col">ShippingDate</th>
                    <th scope="col">DeliveryDate</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">TotalAmount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.canceledData.map(item=>{
                        return (<tr class="bg-light">
                        <th scope="row">{this.state.canceledData.indexOf(item)+1}</th>
                        <td><img style={{height:'50px',width:'30px'}} src={require('../../asserts/productImages/'+item.images[0])}/></td>
                        <td>{item.productname}</td>
                        <td>{item.address}</td>
                        <td>{item.buying_date.substring(0,10)}</td>
                        <td class="text-center">{item.shiping_date==null?<i class="fa fa-circle-o-notch fa-spin text-primary"></i>:<small class="text-primary">{item.shiping_date}</small>}</td>
                        <td class="text-center">{item.delivery_date==null?<i class="fa fa-circle-o-notch fa-spin text-primary"></i>:<small class="text-primary">{item.delivery_date}</small>}</td>
                        <td class="text-success">{item.quantity}</td>
                        <td class="text-success">&#8377;{item.total_amount}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
         );
    }
}
 
export default Canceled;