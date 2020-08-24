import React, { Component } from 'react';
import StockNotFound from '../../asserts/logo/emptyStock.png'
import Axios from 'axios';
class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pendingData:[],
            success:null,
            fail:null,
         }
        for(let item of this.props.data){
            if(item.shiping_date==null && item.delivery_date==null){
                this.state.pendingData.push(item)
            }
        }
        this.setState({pendingData:this.state.pendingData})
    }
    handleCancel=(item)=>{
        const Product={
            "buyid":item.buyid,
            "pid":item.pid,
            "uid":item.uid,
            "buying_date":item.buying_date.substring(0,10),
            "shiping_date":item.shiping_date,
            "delivery_date":item.delivery_date,
            "total_amount":item.total_amount,
            "quantity":item.quantity,
            "canceled_date":new Date().toISOString().substring(0,10)
        }
        Axios.post("http://localhost:4200/cancelProduct",{Product}).then((res)=>{
            if(res.data.length>0){
                this.state.pendingData.splice(this.state.pendingData.indexOf(item),1)
                this.setState({pendingData:this.state.pendingData})
                this.props.get()
                this.setState({success:item.productname+" is canceled Successfully on "+Product.canceled_date})
            }
            else
            {
                this.setState({fail:'Process is terminated dut ot some issue...'})
            }
        })
    }
    render() { 
        if(this.state.pendingData.length==0){
            return (
                <img style={{marginTop:'2rem',display:'block',width:'40%',marginLeft:'auto',marginRight:'auto'}} src={StockNotFound}/>
            )
        }
        return ( 
            <>
            <h5>Pending Products:</h5>
            {this.state.success!=null?<div style={{margin:'1rem'}}><small class="alert alert-warning m-4 text-center">{this.state.success}</small></div>:null}
            {this.state.fail!=null?<small class="alert alert-info m-4 text-center">{this.state.fail}</small>:null}
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
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.pendingData.map(item=>{
                        return (<tr>
                        <th scope="row">{this.state.pendingData.indexOf(item)+1}</th>
                        <td><img style={{height:'50px',width:'30px'}} src={require('../../asserts/productImages/'+item.images[0])}/></td>
                        <td>{item.productname}</td>
                        <td>{item.address}</td>
                        <td>{item.buying_date.substring(0,10)}</td>
                        <td class="text-center"><i class="fa fa-circle-o-notch fa-spin text-primary"></i></td>
                        <td class="text-center"><i class="fa fa-circle-o-notch fa-spin text-primary"></i></td>
                        <td class="text-success">{item.quantity}</td>
                        <td class="text-success">&#8377;{item.total_amount}</td>
                        <td><button onClick={()=>this.handleCancel(item)} class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
         );
    }
}
 
export default Pending;