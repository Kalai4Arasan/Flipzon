import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import Axios from 'axios';

const AddReview=()=> {
    const history=useHistory()
    const {state}=useLocation()
    const [showImage,setImage]=useState(state.item.images[0])
    const [rating,setRating]=useState(null)
    const [review,setReview]=useState(null)
    const [ferror,setFerror]=useState(null)

    if(!sessionStorage.getItem("User")){
        return <Redirect to="/login"/>
    }
    function handleChange(e){
        const name=e.target.name
        const value=e.target.value
        switch(name){
            case "rating":
                setRating(value)
                break
            case "review":
                setReview(value)
                break
        }
    }
    function handleSubmit(){
        if(rating!=null && review!=null && rating.length>0 && review.length>0){
            const Data={'uid':state.item.id,'pid':state.item.pid,'buyid':state.item.buyid,'rating':rating,'review':review}
            console.log(Data)
            Axios.post('http://localhost:4200/addReview',{Data}).then((res)=>{
                if(res.data.length>0){
                    history.push(
                        {
                            pathname:'/orders',
                        }
                    )
                }
            })
        }
        else{
            setFerror("All fields must be required!")
        }
    }
    return ( 
        <div class="mt-2">
            <h3>Add Review:</h3>
            <hr/>
            <div style={{marginTop:'3rem'}} class="animate__animated animate__fadeIn">
            <div class="row" style={{marginLeft:'1rem',display:'flex',marginLeft:'-30px'}}>
            <div class="col-md-1 ">
            {state.item.images.map(item=>{
                return(
                <div style={{maxHeight:"100px",width:"40px",marginTop:'.5rem'}}>
                <img class="card-img-top img-thumbnail thumbHover" style={{cursor:'pointer'}} onMouseOver={()=>setImage(item)}  src={require('../../asserts/productImages/'+item)} alt="Card image cap"/>
                </div>)
            })}
            </div>
            <div class="col-md-4">
            {showImage?<div  ><img class="card-img-top" style={{maxHeight:'400px',maxWidth:'250px'}} src={require('../../asserts/productImages/'+showImage)} alt="Card image cap"/></div>:""}
            </div>
            <div class="col-md-7">
                <h4>Purchased Details:</h4>
                <div style={{height:'250px',overflowY:'scroll'}}>
                <table class="table col-md-12">
                    <tbody>
                        <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{state.item.name}</td>
                        </tr>
                        <tr>
                        <td>Product Name</td>
                        <td>:</td>
                        <td>{state.item.productname}</td>
                        </tr>
                        <tr>
                        <td>Quantity</td>
                        <td>:</td>
                        <td>{state.item.quantity}</td>
                        </tr>
                        <tr>
                        <td>Total Amount</td>
                        <td>:</td>
                        <td>&#8377;{state.item.total_amount}</td>
                        </tr>
                        <tr>
                        <td>Purchased Date</td>
                        <td>:</td>
                        <td>{state.item.buying_date.substring(0,10)}</td>
                        </tr>
                        <tr>
                        <td>Payment Mode</td>
                        <td>:</td>
                        <td>Online</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div class="form-group mt-3">
                    <label for="rating" class="font-weight-bolder mt-2">Rating:</label>
                    <input id="rating" onChange={handleChange.bind(this)} name="rating" type="number" min="1" max="5" class="form-control" placeholder="Rate this product"/>
                    <label for="review" class="font-weight-bolder mt-2">Comment:</label>
                    <textarea rows="5" onChange={handleChange.bind(this)} name="review" id="review"  class="form-control" placeholder="Feedback or Review for this product"/>
                    {ferror!=null && ferror.length>0?<h6 class="text-danger alert text-center">{ferror}</h6>:null }
                    <button class="btn btn-success mt-3" onClick={()=>handleSubmit()} style={{display:'block',marginLeft:'auto',marginRight:'auto'}}>Submit</button>
                </div>
            </div>
        </div>
        </div>
            
        </div>

     );
}
 
export default AddReview;