import React, { Component } from 'react';
class Shipped extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shippedData:[]
         }
        for(let item of this.props.data){
            if(item.shiping_date!=null && item.delivery_date!=null){
                this.state.shippedData.push(item)
            }
        }
        this.setState({shippedData:this.state.shippedData})
    }
    render() { 
        if(this.state.shippedData.length==0){
            return (
                <h3>Shipped products not found...</h3>
            )
        }
        return ( 
            <>
            <h5>Shipped Products:</h5>
            <table class="table mt-2">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">ProductImage</th>
                    <th scope="col">ProductName</th>
                    <th scope="col">DeliveryAddress</th>
                    <th scope="col">OrderedDate</th>
                    <th scope="col">ShippingDate</th>
                    <th scope="col">DeliveryDate</th>
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
                        <td class="text-center text-primary">{item.shiping_date}</td>
                        <td class="text-center text-primary">{item.delivery_date}</td>
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