import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import JwtDecode from 'jwt-decode'
import Axios from 'axios'

const BuyProduct=function(){
        const location=useLocation()
        const history=useHistory()
        const {product}=location.state
        const User=JwtDecode(sessionStorage.getItem("User"))
        const [rate,setRate]=useState(product.rate)
        const [address,setAddress]=useState(User.address)
        const [quantity,setQuantity]=useState(1)
        const [qerror,setQerror]=useState(null)
        const [ferror,setFerror]=useState(null)
        const [redirect,setRedirect]=useState(false)
        const [data,setData]=useState(null)

        if(product.cart_id){
            console.log(product.cart_id)
            const Data={"cid":product.cart_id,"uid":product.id}
            Axios.post("http://localhost:4200/deleteCart",{Data}).then(res=>{
                console.log("Deleted from cart")
            })
        }



        function handleQuantity(e){
            if(e.target.value<=20){
            setQuantity(e.target.value)
            setRate(product.rate*e.target.value)
            setQerror(null)
            }
            else{
                setQerror("Quantity limit is 20")
            }
        }
        function handleAddress(e){
            setAddress(e.target.value)
        }
        function handleSubmit(e){
            e.preventDefault()
            if(address.length>0 && quantity>0){
                setFerror(null)
                const Data={
                    "uid":User.id,
                    "pid":product.pid,
                    "quantity":quantity,
                    "totalRate":rate,
                    "buyingDate":new Date().toISOString().substring(0,10)
                }
                Axios.post('http://localhost:4200/buyproduct',{Data}).then((res)=>{
                    if(res.data.length>0){
                        setData(res.data[0])
                        setRedirect(true)
                    }
                    else{
                        setFerror("You can't able to buy this product")
                    }
                })
            }
            else{
                setFerror("Please fill the required fields")
            }
        }
        if(redirect==true){
            history.push('/successPayment',[data,product])       
        }
        return (
            <div class="mt-4 row">
                <div class="col-md-3"></div>
                <div class="col-md-6 m-4">
                    <h3>Delivery Details:</h3>
                    <hr/>
                    <form class="form" onSubmit={handleSubmit.bind(this)}>
                        <label for="name" class="mt-4 font-weight-bolder">Buyer Name:</label>
                        <input id="name" class="form-control"  value={User.name} readOnly/>
                        <label for="pdname" class="mt-4 font-weight-bolder">Product Name</label>
                        <input id="pdname" class="form-control" value={product.productname} readOnly/>
                        <label for="rate" class="mt-4 font-weight-bolder"> Amount <span><small>(for one product)</small></span> :</label>
                        <input id="rate" class="form-control" value={product.rate} readOnly/>
                        <label for="address"  class="mt-4 font-weight-bolder" >Address</label>
                        <textarea id="address" onChange={handleAddress.bind(this)} class="form-control" name="address" value={address} />
                        {address.length==0?<h6 class="text-danger text-center mt-1" style={{fontSize:'14px'}}>Addess field must be required...<br/></h6>:null}
                        <label for="rate" class="mt-4 font-weight-bolder" > Quantity :</label>
                        <input id="rate" onChange={handleQuantity.bind(this)} type="Number" min="1" max="20" value={quantity} class="form-control"/>
                        {qerror!=null?<h6 class="text-danger text-center mt-1" style={{fontSize:'14px'}}>{qerror}<br/></h6>:quantity>0?null:<h6 class="text-danger text-center mt-1" style={{fontSize:'14px'}}>Quantity Field Must be required...<br/></h6>}
                        <label for="totrate" class="mt-4 font-weight-bolder"> Total Amount :</label>
                        <strong id="totrate" class="form-control alert alert-info">&#8377;{rate}</strong>
                        {ferror!=null?<h6 class="text-danger text-center mt-1" style={{fontSize:'14px'}}>{ferror}<br/></h6>:null}
                        <button type="submit" class="btn btn-success" style={{marginLeft:'30%',marginRight:'30%'}}>Proceed To Payment</button>
                    </form> 
                </div>
                <div class="col-md-3"></div>
            </div>
        )   

}
export default BuyProduct