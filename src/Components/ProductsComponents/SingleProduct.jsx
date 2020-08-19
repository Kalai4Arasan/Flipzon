import { useLocation, Redirect, useHistory } from "react-router-dom";
import React, { useState } from 'react';
import './ProductComponent.css'
import Axios from "axios";
import JwtDecode from "jwt-decode";
const SingleProduct=()=>{
    const history=useHistory()
    const {state}=useLocation()
    const [showImage,setImage]=useState(state.images[0])
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    function handleBuy(){
        if(sessionStorage.getItem("User")){
            return history.push(
                '/buyproduct',
                    {
                        product:state
                    }
            )
        }
        else{
            return history.push('/login')
        }
    }
    function handleCart(){
        setLoading(true)
        setError(null)
        setSuccess(null)
        if(sessionStorage.getItem("User")){
            const userData=JwtDecode(sessionStorage.getItem('User'))
            const Product={"uid":userData.id,"pid":state.pid}
            Axios.post('http://localhost:4200/addtocart',{Product}).then((res)=>{
                if(res.data=="Error"){
                    setError("Already added in cart")
                }
                else{
                    if(res.data.length>0){
                        setSuccess("Succesfully added in your cart")
                    }
                    else{
                        setError("Something is wrong...")
                    }
                }
                setLoading(false)
            })
        }
        else{
            return history.push('/login')
        }
    }
    return (
        <div style={{marginTop:'3rem'}}>
            <div class="row" style={{marginLeft:'1rem',display:'flex',marginLeft:'-30px'}}>
            <div class="col-md-1 ">
            {state.images.map(item=>{
                return(
                <div style={{height:"100px",width:"40px"}}>
                <img class="card-img-top img-thumbnail thumbHover" style={{cursor:'pointer'}} onMouseOver={()=>setImage(item)}  src={require('../../asserts/productImages/'+item)} alt="Card image cap"/>
                </div>)
            })}
            </div>
            <div class="col-md-3">
            {showImage?<div style={{height:'300px',width:'150px'}} ><img class="card-img-top" src={require('../../asserts/productImages/'+showImage)} alt="Card image cap"/></div>:""}
            </div>
            <div class="col-md-7">
            <p style={{margin:'2rem'}}>
                <h3>{state.productname}</h3>
            <small class="badge badge-success badge-pill ">{state.rating} <i class="fa fa-star"></i></small><span style={{marginLeft:'1rem',fontSize:'20px',fontWeight:'700'}}>&#8377;{state.rate}</span>
            <strong><br/><br/>Description :</strong>
            <p style={{marginTop:'1rem',fontSize:'13px'}}>
                {state.description}
            </p>
            <h3 class="badge badge-primary">{state.brand}</h3><h3 class="badge badge-primary ml-2">{state.category}</h3>
            </p>
            {error!=null&&error.length>0?<h6 class="alert alert-danger text-center" style={{marginLeft:'5rem',marginRight:'5rem'}}>{error}</h6>:null}
            {success!=null&&success.length>0?<h6 style={{marginLeft:'5rem',marginRight:'5rem'}} class="alert alert-success text-center">{success}</h6>:null}
            <div style={{marginLeft:'2rem'}}>
        <button onClick={()=>handleCart()} class={isLoading==false?"btn btn-warning w-25":"btn btn-warning w-25 disabled"}>{isLoading==false?<>Add to <i class="fa fa-shopping-cart"></i></>:<i class="fa fa-spin fa-spinner"></i>}</button><button onClick={()=>handleBuy()} class="btn btn-primary ml-3 w-25">Buy</button>
            </div>
            <h4 class="mt-4" style={{marginLeft:'2rem'}}>Reviews :</h4>
            </div>
        </div>
        </div>
    )
}

export default SingleProduct;

