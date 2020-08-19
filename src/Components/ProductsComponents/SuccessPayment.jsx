import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import success from '../../asserts/logo/Success.png'
import JwtDecode from 'jwt-decode'
const SuccessPayment=function(){
    const location=useLocation()
    const history=useHistory()
    if(!location.state){
         history.push('/login')
         return <h1>PageNotFound</h1>
    }
    const userData=JwtDecode(sessionStorage.getItem("User"))
    const data=location.state
    const pdata=data[1]
    const bdata=data[0]
    if(data.length>0){
        return (
            <div style={{marginTop:'1rem'}}>
                <h3 class="alert alert-success ">Your order is placed successfully...</h3>
                <div class="card">
                   <div class="card-body text-center" style={{marginTop:'1rem'}}>
                       <img src={success} style={{display:'flex',marginLeft:'auto',marginRight:'auto',width:'40%',height:'40%',marginTop:'-8%'}}/>
                        <h5 style={{marginBottom:'1rem'}}>Summary of your Payment:</h5>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <table class="table table-hover col-md-6">
                                    <tbody>
                                        <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        <td>{userData.name}</td>
                                        </tr>
                                        <tr>
                                        <td>Product Name</td>
                                        <td>:</td>
                                        <td>{pdata.productname}</td>
                                        </tr>
                                        <tr>
                                        <td>Quantity</td>
                                        <td>:</td>
                                        <td>{bdata.quantity}</td>
                                        </tr>
                                        <tr>
                                        <td>Total Amount</td>
                                        <td>:</td>
                                        <td>&#8377;{bdata.totalRate}</td>
                                        </tr>
                                        <tr>
                                        <td>Purchased Date</td>
                                        <td>:</td>
                                        <td>{bdata.buyingDate}</td>
                                        </tr>
                                        <tr>
                                        <td>Payment Mode</td>
                                        <td>:</td>
                                        <td>Online</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-3"></div>
                            </div>
                            <Link class="btn btn-outline-primary" to="/"><i class="fa fa-arrow-left"></i> Home</Link>
                   </div>
                </div>
            </div>
        )
    }
}
export default SuccessPayment