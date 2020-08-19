import React, { Component } from 'react';
import Axios from 'axios';
import Loading from './Loading';
import JwtDecode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartData:null,
            isLoading:true,
            userData:JwtDecode(sessionStorage.getItem('User'))
         }
    }
    componentDidMount(){
        const User={"uid":this.state.userData.id}
        Axios.post("http://localhost:4200/cart",{User}).then((res)=>{
            if(res.data.length>0){
                this.setState({cartData:res.data})
            }
            this.setState({isLoading:false})
        })
    }

    handleDelete=(product)=>{
        const Data={"cid":product.cart_id,"uid":product.id}
            Axios.post("http://localhost:4200/deleteCart",{Data}).then(res=>{
                if(res.data.length>0){
                    this.setState({cartData:res.data})
                }
            })
    }

    render() { 
        if(!sessionStorage.getItem("User")){
            return <Redirect to="/login"/>
        }
        if(this.state.isLoading===true){
            return <Loading/>
        } 
        console.log(this.state.cartData)
        return ( 
            <div style={{marginTop:'4rem'}}>
                <h3>Products In Cart :</h3><hr/>
                <div className="row">
                        {this.state.cartData.map(item=>{
                            return(
                                <div className="col-md-4">
                                    <div class="card" style={{width: '18rem',minHeight:'360px',overflow:'hidden',border:'1px solid white',boxShadow:'.5rem .5rem 1rem black'}}>
                                        <i class="fa fa-times text-danger" onClick={()=>this.handleDelete(item)} style={{display:'flex',marginTop:'.5rem',marginLeft:'16rem',cursor:'pointer'}}></i>
                                        <img class="card-img-top" style={{height:'100px',width:'100px',display:'block',marginLeft:'auto',marginRight:'auto',marginTop:'2rem'}} src={require('../../asserts/productImages/'+item.images[0])}  alt="Card image cap"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{item.productname}</h5>
                                            <small class="badge badge-info">{item.brand}</small>
                                            <small class="badge badge-info ml-2">{item.category}</small><br/>
                                            <h5 class="text-success mt-1">&#8377; {item.rate}</h5>
                                            <div style={{marginLeft:'40%',marginRight:'40%',marginTop:'1rem'}}>
                                                <Link to={{
                                                    pathname:'/buyproduct',
                                                    state:{product:item},
                                                }} onClick={()=>window.alert(item.productname+" is removed from cart...")} class="btn btn-outline-primary">Buy</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

            </div>
            </div>
         );
    }
}
 
export default Cart;