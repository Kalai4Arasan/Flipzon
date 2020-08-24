import React, { Component } from 'react';
import StockNotFound from '../../asserts/logo/emptyStock.png'
class Shipped extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shippedData:[]
         }
        for(let item of this.props.data){
            console.log(item.shiping_date,item.delivery_date)
            if(item.shiping_date!=null && item.delivery_date!=null){
                this.state.shippedData.push(item)
            }
        }
        this.setState({shippedData:this.state.shippedData})
    }
    render() { 
        console.log(this.state.shippedData)
        if(this.state.shippedData.length==0){
            return (
                <img style={{marginTop:'2rem',display:'block',width:'40%',marginLeft:'auto',marginRight:'auto'}} src={StockNotFound}/>
            )
        }
        return ( 
            <>
            <h5>Shipped Products:</h5>
            <table class="table mt-2 animate__animated animate__fadeIn">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">ProductImage</th>
                    <th scope="col">ProductName</th>
                    <th scope="col">DeliveryAddress</th>
                    <th scope="col">OrderedDate</th>
                    <th scope="col">ShippedDate</th>
                    <th scope="col">DeliveryDate</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">TotalAmount</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.shippedData.map(item=>{
                        return (<tr>
                        <th scope="row">{this.state.shippedData.indexOf(item)+1}</th>
                        <td><img style={{height:'50px',width:'30px'}} src={require('../../asserts/productImages/'+item.images[0])}/></td>
                        <td>{item.productname}</td>
                        <td>{item.address}</td>
                        <td>{item.buying_date.substring(0,10)}</td>
                        <td class="text-center text-primary">{item.shiping_date.substring(0,10)}</td>
                        <td class="text-center text-primary">{item.delivery_date.substring(0,10)}</td>
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
 
export default Shipped;