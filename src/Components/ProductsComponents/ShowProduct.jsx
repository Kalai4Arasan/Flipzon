import React, { Component } from 'react';
import Axios from 'axios';
import NotFound from '../../asserts/wallpaper/NotFound.png';
import './ProductComponent.css'
import Loading from './Loading';
import { Link } from 'react-router-dom';
class ShowProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productData:null,
            brands:null,
            filterBrand:[],
            min:null,
            max:null,
            isLoading:true,
            rateError:false,
            finalMinRate:null,
            finalMaxRate:null,
            filteredData:null,
         }
    }
    componentDidUpdate(prevProps){
        if(this.props.content.category!=prevProps.content.category){
            Axios.get('http://localhost:4200/getProducts',{
                params:{
                    category:this.props.content.category
                }
            }).then(res=>{
                this.setState({filterBrand:[]})
                this.setState({productData:res.data})
                this.uniqueCategory(res.data);
            })
            const boxes=document.getElementsByName('checking[]')
            for(let i=0 ;i<boxes.length;i++){
                boxes[i].checked=false
            }
            if(document.getElementById('min')!=null && document.getElementById('max')!=null){
            document.getElementById('min').value=''
            document.getElementById('max').value=''
            }
            this.setState({rateError:false})
            this.setState({finalMinRate:null})
            this.setState({finalMaxRate:null})
            this.setState({filteredData:null})
        }
    }
    uniqueCategory=(data)=>{
        let s=new Set()
        for(let item of data){
            s.add(item.brand)
        }
        this.setState({brands:Array.from(s)})

    }
    componentDidMount(){
        Axios.get('http://localhost:4200/getProducts',{
             params:{
                 category:this.props.content.category
             }
         }).then(res=>{
            this.setState({isLoading:false})
            this.setState({productData:res.data})
            this.uniqueCategory(res.data);
        })
    }
    handleBrand=(e)=>{
        let name=e.target.name
        let value=e.target.value
        if(e.target.checked){
        this.state.filterBrand.push(value)
        let brands=this.state.filterBrand
        this.setState({filterBrand:brands})
        }
        else{
            this.state.filterBrand.splice(this.state.filterBrand.indexOf(value),1)
            let brands=this.state.filterBrand
            this.setState({filterBrand:brands})
        }
        if(this.state.filterBrand.length>0){
        const Brand=this.state.filterBrand
        const data=[]
        if(this.state.finalMaxRate==null && this.state.finalMinRate==null){
            for (let item of this.state.productData){
                if(Brand.indexOf(item.brand)>=0){
                    data.push(item)
                }
            }
        }
        else{
            for (let item of this.state.productData){
                if(this.state.filterBrand.indexOf(item.brand)>=0 && item.rate-item.discount>=Number(this.state.finalMinRate) && item.rate-item.discount<=Number(this.state.finalMaxRate)){
                    data.push(item)
                }
            }

        }
        this.setState({filteredData:data})
        }
        else{
            const data=[]
            if(this.state.finalMinRate>0 && this.state.finalMaxRate>0){
                for (let item of this.state.productData){
                    if(item.rate-item.discount>=Number(this.state.finalMinRate) && item.rate-item.discount<=Number(this.state.finalMaxRate)){
                        data.push(item)
                    }
                }
                this.setState({filteredData:data})
            }
            else{
                this.setState({filteredData:this.state.productData})
            }
        }
    }

    handleRate=(e)=>{
        let value=e.target.value
        let name=e.target.name
        this.setState({[name]:value})
    }

    submitRate=()=>{
        document.getElementById('min').value=''
        document.getElementById('max').value=''
        if(Number(this.state.min)<Number(this.state.max)){
            this.setState({finalMinRate:this.state.min})
            this.setState({finalMaxRate:this.state.max})
            const data=[]
            if(this.state.filterBrand.length==0){
                for (let item of this.state.productData){
                    if(item.rate-item.discount>=Number(this.state.min) && item.rate-item.discount<=Number(this.state.max)){
                        data.push(item)
                    }
                }
            }
            else{
                for (let item of this.state.productData){
                    if(this.state.filterBrand.indexOf(item.brand)>=0 && item.rate-item.discount>=Number(this.state.min) && item.rate-item.discount<=Number(this.state.max)){
                        data.push(item)
                    }
                }

            }
            console.log(data)
            this.setState({filteredData:data})
            
        }
        else{
            this.setState({rateError:true})
            this.setState({finalMinRate:null})
            this.setState({finalMaxRate:null})
        }
    }

    cancelRate=()=>{
        this.setState({finalMaxRate:null})
        this.setState({finalMinRate:null})
        if(this.state.filterBrand.length>0){
            const data=[]
            for (let item of this.state.productData){
                if(this.state.filterBrand.indexOf(item.brand)>=0){
                    data.push(item)
                }
            }
            this.setState({filteredData:data})
        }
        else{
            this.setState({filteredData:this.state.productData})
        }
    }
    cancelBrand=(item)=>{
        const Brand=this.state.filterBrand.splice(this.state.filterBrand.indexOf(item),1)
        document.getElementById(item).checked=false
        this.setState({filteredData:Brand})
        if(this.state.filterBrand.length>0){
            const Brand=this.state.filterBrand
            const data=[]
            if(this.state.finalMaxRate==null && this.state.finalMinRate==null){
                for (let item of this.state.productData){
                    if(Brand.indexOf(item.brand)>=0){
                        data.push(item)
                    }
                }
            }
            else{
                for (let item of this.state.productData){
                    if(this.state.filterBrand.indexOf(item.brand)>=0 && item.rate-item.discount>=Number(this.state.finalMinRate) && item.rate-item.discount<=Number(this.state.finalMaxRate)){
                        data.push(item)
                    }
                }
    
            }
            this.setState({filteredData:data})
            }
            else{
                const data=[]
                if(this.state.finalMinRate>0 && this.state.finalMaxRate>0){
                    for (let item of this.state.productData){
                        if(item.rate-item.discount>=Number(this.state.finalMinRate) && item.rate-item.discount<=Number(this.state.finalMaxRate)){
                            data.push(item)
                        }
                    }
                    this.setState({filteredData:data})
                }
                else{
                    this.setState({filteredData:this.state.productData})
                }
            }

    }

    render() {
        if(this.state.isLoading===true){
            return <Loading/>
        } 
    if(this.state.productData!=null && this.state.productData.length>0){
    return ( 
        <>
        <h3 style={{marginTop:'1rem'}}>{this.props.content.title}</h3><hr/>
        <div  class="row animate__animated animate__fadeIn">
            <div class="col-md-3" style={{borderRight:'1px solid #c7c6c3',minHeight:'400px'}}>
                 <h5>Filter</h5><hr/>
                 {this.state.finalMinRate!=null && this.state.finalMaxRate!=null?<p class="badge badge-warning mt-2 ml-2">{this.state.finalMinRate}-{this.state.finalMaxRate} <i style={{cursor:'pointer'}} class="fa fa-times text-danger" onClick={()=>this.cancelRate()} ></i></p>:null}
                 {this.state.filterBrand.length>0?<div> 
                 {this.state.filterBrand.map(item=><p class="badge badge-info mt-2 ml-2">{item} <i style={{cursor:'pointer'}} onClick={()=>this.cancelBrand(item)} class="fa fa-times text-danger"></i></p>)}
                 </div>:null}
                 <br/><strong class="mb-1">Rate :</strong><br/>
                 <div class="row">
                     <div class="col-md-4">
                     <input onChange={this.handleRate} class="input form-control" id="min" name="min" placeholder="Min"/>
                     </div>
                     <div class="col-md-4">
                     <input onChange={this.handleRate} class="input form-control" id="max" name="max" placeholder="Max"/>
                     </div>
                     <div class="col-md-4">
                     <button onClick={()=>this.submitRate()} class="btn btn-primary mt-3"><i class="fa fa-check"></i></button>
                     </div>
                 </div>
                 {this.state.rateError==true?<div class="row"><span style={{marginLeft:'3rem'}}><small class="text-danger">Rate Value Invalid</small><br/></span></div>:null}
                 <strong class="mb-3 mt-2">Brands :</strong><br/>
                    {this.state.brands!=null?this.state.brands.map(item=><div class="row" style={{marginLeft:'4rem'}}><label class="font-weight-bolder" ><input   onChange={this.handleBrand} type="checkbox" name="checking[]" id={item} value={item} /> {item}</label><br/></div>):"No Brands Available"}
            </div>
            <div class="col-md-9">
                {this.state.filteredData==null?this.state.productData.map(item=>{
                    return (
                    <div class="row " style={{marginLeft:'1rem',borderBottom:'1px solid #c7c6c3'}}>
                    <div class="col-md-4">
                    <Link to={
                        {pathname:'/singleproduct',state:item}
                    }><img class="card-img-top" style={{margin:'2rem',height:'180px',width:'130px'}}  src={require('../../asserts/productImages/'+item.images[0])} alt="Card image cap"/>
                    </Link>
                    </div>
                    <div class="col-md-8">
                    <p style={{margin:'2rem'}}>
                        <h3>{item.productname}</h3>
                    <small class="badge badge-success badge-pill ">{item.rating} <i class="fa fa-star"></i></small>
                    {item.discount==0?<span style={{marginLeft:'1rem',fontSize:'20px',fontWeight:'700'}}>&#8377;{parseFloat(item.rate).toFixed(2)}</span>:
                        <div><span style={{marginLeft:'1rem',fontSize:'20px',fontWeight:'700'}}>&#8377;{(item.rate-item.discount).toFixed(2)}</span><span><small style={{color:'grey',textDecoration:'line-through',marginLeft:'.5rem'}}>&#8377;{parseFloat(item.rate).toFixed(2)}</small><strong class="badge badge-success ml-3">{(((item.discount)/item.rate)*100).toFixed(2)}% off</strong></span></div>  
                    }
                    <p style={{marginTop:'1rem',maxHeight:'100px',width:'300px',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {item.description}
                    </p><span style={{display:'flex',marginTop:'-25px'}}>...</span>
                    <h3 class="badge badge-primary">{item.brand}</h3>
                    </p>
                    </div>
                    </div>)
                }):this.state.filteredData.length>0?this.state.filteredData.map(item=>{
                    return (
                    <div class="row" style={{marginLeft:'1rem',borderBottom:'1px solid #c7c6c3'}}>
                    <div class="col-md-4">
                    <Link to={
                        {pathname:'/singleproduct',state:item}
                    }><img class="card-img-top" style={{margin:'2rem',height:'180px',width:'130px'}}  src={require('../../asserts/productImages/'+item.images[0])} alt="Card image cap"/>
                    </Link>
                    </div>
                    <div class="col-md-8">
                    <p style={{margin:'2rem'}}>
                        <h3>{item.productname}</h3>
                    <small class="badge badge-success badge-pill ">{item.rating} <i class="fa fa-star"></i></small>
                    {item.discount==0?<span style={{marginLeft:'1rem',fontSize:'20px',fontWeight:'700'}}>&#8377;{parseFloat(item.rate).toFixed(2)}</span>:
                        <div><span style={{marginLeft:'1rem',fontSize:'20px',fontWeight:'700'}}>&#8377;{(item.rate-item.discount).toFixed(2)}</span><span><small style={{color:'grey',textDecoration:'line-through',marginLeft:'.5rem'}}>&#8377;{parseFloat(item.rate).toFixed(2)}</small><strong class="badge badge-success ml-3">{(((item.discount)/item.rate)*100).toFixed(2)}% off</strong></span></div>  
                    }
                    <p style={{marginTop:'1rem',maxHeight:'100px',width:'300px',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {item.description}
                    </p><span style={{display:'flex',marginTop:'-25px'}}>...</span>
                    <h3 class="badge badge-primary">{item.brand}</h3>
                    </p>
                    </div>
                    </div>)
                }):<img style={{marginTop:'2rem',display:'block',width:'50%',marginLeft:'auto',marginRight:'auto'}} src={NotFound}/>}
            </div>
        </div>
        </>
     );
    }
    return(
        <>
        <h3 style={{marginTop:'1rem'}}>{this.props.content.title}</h3><hr/>
        <div class="container">
            <img style={{display:'block',width:'50%',marginLeft:'auto',marginRight:'auto'}} src={NotFound}/>
        </div>
        </>
    )
    }
}
 
export default ShowProduct;