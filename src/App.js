import React, { Component } from 'react';
import './App.css';
import Logo from './asserts/logo/HomeLogo.png'
import CartImage from './asserts/logo/cart.png'
import Fire from './asserts/logo/fire.png'
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import OfferZone from './Components/ProductsComponents/OfferZone';
import ShowProduct from './Components/ProductsComponents/ShowProduct';
import JwtDecode from 'jwt-decode';
import Home from './Components/ProductsComponents/Home';
import SingleProduct from './Components/ProductsComponents/SingleProduct';
import BuyProduct from './Components/ProductsComponents/BuyProduct';
import SuccessPayment from './Components/ProductsComponents/SuccessPayment';
import Cart from './Components/ProductsComponents/Cart';
import OrderedProducts from './Components/ProductsComponents/OrderedProducts';
import Axios from 'axios';
import AddReview from './Components/ProductsComponents/AddReview';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:sessionStorage.getItem('User')!=null? JwtDecode(sessionStorage.getItem('User')):null,
            cartCount:0,
         }
    }
    setAuth=()=>{
        if(this.state.userData==null){
        return (
        <>
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Account
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link class="dropdown-item " to="/login">Login</Link>
        <Link class="dropdown-item " to="/register">Register</Link>
        </div>
        </>
        )
        }
        else{
            return(
                <>
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.userData.name}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item " to="/profile">Profile</Link>
                <a class="dropdown-item " style={{cursor:'pointer'}} onClick={()=>{sessionStorage.removeItem("User");this.setState({userData:null})}}>Logout</a>
                </div>
                </> 
            )
        }
    }
    componentWillMount(){
        this.setCartCount()
    }

    setCartCount=()=>{
        if(sessionStorage.getItem('User')){
            const User={'uid':this.state.userData.id}
            Axios.post('http://localhost:4200/getCartCount',{User}).then((res)=>{
                this.setState({cartCount:res.data})
            })
        }
    }
    render() { 
        return ( 
            <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <Link class="navbar-brand text-white " to="/"><img src={Logo} height="40" width="40" style={{borderRadius:'3rem',marginRight:'5px'}}/>Flipzon</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i class="fa fa-bars text-white"></i></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto links">
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Electronics
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link class="dropdown-item " to="/smartphones">SmartPhones</Link>
                        <Link class="dropdown-item " to="/laptops">Laptops</Link>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Cloths
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link class="dropdown-item " to="/Men">Men</Link>
                        <Link class="dropdown-item " to="/Women">Women</Link>
                        <Link class="dropdown-item " to="/Kids">Kids</Link>
                        </div>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <Link class="nav-link text-white" to="/appliances">
                            Tv&Appliances
                        </Link>
                    </li>
                    <li class="nav-item dropdown text-white">
                        <Link class="nav-link text-white" to="/offerzone">
                        OfferZone<img style={{display:'flex',marginTop:'-30px',marginLeft:'-30px'}} src={Fire} height="50" width="130"/>
                        </Link>
                    </li>
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                    <ul class="navbar-nav links">
                    {sessionStorage.getItem('User')?<>
                        <li class="nav-item dropdown text-white">
                            <Link class="nav-link text-white" style={{display:'flex',marginTop:'-10px'}} to="/cart">
                                {/* <i class="fa fa-shopping-cart" style={{fontSize:'35px'}}></i> */}
                                <img src={CartImage} height="40" width="40"/>
                                <strong style={{marginLeft:'-26px',marginTop:'-18px',color:'orange'}}>{this.state.cartCount>0?<span class="badge badge-pill badge-light">{this.state.cartCount}</span>:<span>&#128577;</span>}</strong>
                            </Link>
                        </li>
                        <li class="nav-item dropdown text-white">
                            <Link class="nav-link text-white" to="/orders">
                                <i class="fa fa-map-marker"> Your Orders</i>
                            </Link>
                        </li>
                    </>:null}

                    <li class="nav-item dropdown text-white">
                        {this.setAuth()}
                    </li>
                    </ul>
                    </div>
                </div>
                </nav>
                <div class="container">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/smartphones">
                        <ShowProduct content={{title:'SmartPhones&Gadgets',category:'SmartPhones'}}/>
                    </Route>
                    <Route exact path="/laptops">
                        <ShowProduct content={{title:'Laptops&Accessories',category:'Laptops'}}/>
                    </Route>
                    <Route exact path="/men">
                        <ShowProduct content={{title:"MenWears",category:'Men'}}/>
                    </Route>
                    <Route exact path="/women">
                        <ShowProduct content={{title:'WomenWears',category:'Women'}}/>
                    </Route>
                    <Route exact path="/kids">
                        <ShowProduct content={{title:'KidsWears',category:'Kids'}}/>
                    </Route>
                    <Route exact path="/appliances">
                        <ShowProduct content={{title:'HomeAppliances&Accessories',category:'Appliances'}}/>
                    </Route>
                    <Route exact path="/offerzone">
                        <OfferZone/>
                    </Route>
                    <Route exact path="/singleproduct">
                        <SingleProduct content={this.setCartCount}/>
                    </Route>
                    <Route exact path="/buyproduct">
                        <BuyProduct content={this.setCartCount}/>
                    </Route>
                    <Route exact path="/successPayment">
                        <SuccessPayment/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart content={this.setCartCount}/>
                    </Route>
                    <Route exact path="/orders">
                        <OrderedProducts/>
                    </Route>
                    <Route exact path="/pending">
                        <OrderedProducts/>
                    </Route>
                    <Route exact path="/shipped">
                        <OrderedProducts/>
                    </Route>
                    <Route exact path="/canceled">
                        <OrderedProducts/>
                    </Route>
                    <Route exact path="/addReview">
                        <AddReview/>
                    </Route>
                </Switch>
                </div>
            </div>
            );
    }
}
 
export default App;