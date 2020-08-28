import React, { Component } from 'react';
import StockNotFound from '../../asserts/logo/emptyStock.png'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
class Shipped extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shippedData:[],
            userData:JwtDecode(sessionStorage.getItem('User')),
            buyids:[],
            errors:{}
         }
        for(let item of this.props.data){
            console.log(item.shiping_date,item.delivery_date)
            if(item.status==3){
                this.state.shippedData.push(item)
            }
        }
        this.setState({shippedData:this.state.shippedData})
    }
    handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        if(value.length==0){
            this.state.errors[name]="Please fill your review"
        }
        else{
            this.state.errors[name]=null
        }
        this.setState({[name]:value})
    }
    addReview=(item)=>{
        if(this.state[item.buyid].length>0){
            const Review={
                "pid":item.pid,
                "uid":item.uid,
                "review":this.state[item.buyid]
            }
            Axios.post("http://localhost:4200/addReview",{Review}).then((res)=>{
                console.log(res.data)
            })
        }
    }
    componentDidMount(){
        const Data=this.state.userData.id
            Axios.post('http://localhost:4200/allReviews',{Data}).then((res)=>{
                if(res.data.length>0){
                    for(let item of res.data){
                        this.state.buyids.push(item.buyid)
                    }
                   this.setState({buyids:this.state.buyids})
                }
                else{
                    this.setState({buyids:[]})
                }
            })
    }
    render() { 
        console.log(this.state.buyids)
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
                    <th scope="col">Review</th>
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
                        {new Date(item.delivery_date).getTime()<=new Date().getTime()?this.state.buyids.indexOf(item.buyid)==-1?<td>
                            <Link
                                to={
                                    {
                                        pathname:'/addReview',
                                        state:{item}
                                    }
                                }
                                class="btn btn-sm btn-outline-primary"><i class=" fa fa-edit">Review</i> </Link>
                        </td>:<td><h6 class="text-center text-primary">reviewed</h6></td>
                        :<td><h6>Not Available</h6></td>}
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