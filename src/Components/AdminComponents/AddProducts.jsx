import React, { Component } from 'react';
import Loading from '../ProductsComponents/Loading';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
class AddProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            brands:null,
            isLoading:true,
            isRedirect:false,
            categories:null,
            categoryList:null,
            brandid:{},
            categoryid:{},
            productname:null,
            brand:null,
            category:null,
            description:null,
            rate:null,
            rating:null,
            images:null,
            errors:{
                productname:null,
                brand:null,
                category:null,
                description:null,
                rate:null,
                rating:null,
                images:null,
            }
         }
    }


    handleChange=(e)=>{
        const name=e.target.name
        let value=e.target.value
        switch(name){
            case 'brand':
                document.getElementById("Category").selectedIndex=0
                if(value==""){
                    this.setState({categories:this.state.categoryList})
                }
                else{
                    this.setState({categories:this.state.brands[value]})
                }
                break
            case 'images':
                value=e.target.files
                //console.log(Array.from(value)[0].name)
                break
        }
        //console.log(value)
        this.setState({[name]:value})
    }


    componentDidMount(){
        const Data={}
        Axios.get('http://localhost:4200/getBrands').then((res)=>{
            for(let item of res.data){
                if(item.brand in Data){
                    Data[item.brand].push(item.category)
                    this.state.brandid[item.brand]=item.bid
                }
                else{
                    Data[item.brand]=[item.category]
                    this.state.brandid[item.brand]=item.bid
                }
            }
            Axios.get('http://localhost:4200/getCategories').then((res)=>{
                    let list=[]
                    for (let item of res.data){
                        list.push(item.category)
                        this.state.categoryid[item.category]=item.cid
                    }
                    Data['all']=list
                    this.setState({categoryList:list})
                    this.setState({categories:list})
                })
            
            this.setState({brands:Data})
            this.setState({isLoading:false})
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(this.state.images)
        const category=this.state.categoryid[this.state.category]
        const brand=this.state.brandid[this.state.brand]
        const Product={
            name:this.state.productname,
            brand:brand,
            category:category,
            description:this.state.description,
            rate:this.state.rate,
            rating:this.state.rating,
            images:this.state.images
        }
        const formData = new FormData();
        for (const name of Object.keys(Product)) {
            if (name === "images") {
                for (let i = 0; i < Product.images.length; i++) {
                    console.log(Product.images[i])
                    formData.append(name, Product.images[i]);
                }
            }
            formData.append(name, Product[name]);
        }
        Axios.post('http://localhost:4200/addNewProduct',formData).then(res=>{
            if(res.data.length>0){
                this.setState({isRedirect:true})
            }
        })
    }
    


    render() { 
        if(this.state.isRedirect){
            return <Redirect to="/products"/>
        }
        if(this.state.isLoading){
            return <Loading/>
        }
        //console.log(this.state.brandid,this.state.categoryid)
        return ( 
            <div style={{marginTop:'1rem'}}>
                <h4>Add Product:</h4>
                <hr/>
                <form onSubmit={this.handleSubmit} style={{padding:'3rem'}} encType="multipart/form-data">
                <div class="form-group">
                    <label for="ProductName">Product Name :</label>
                    <input onChange={this.handleChange} type="text" class="form-control" name="productname" id="ProductName" placeholder="ex: Redmi Note 8"/>
                    {this.state.productname!=null && this.state.productname.length==0?<h6 class="text-danger alert text-center">ProductName field Must be required</h6>:null }
                </div>
                <div class="form-group">
                    <label for="Brand">Brand :</label>
                    <select onChange={this.handleChange} name="brand" class="form-control" id="Brand">
                    <option value="">---</option>
                    {this.state.brands!=null && Object.keys(this.state.brands).map(item=>{
                        return item!='all'?<option value={item}>{item}</option>:null
                    })}
                    </select>
                    {this.state.brand!=null && this.state.brand.length==0?<h6 class="text-danger alert text-center">Brand field Must be required</h6>:null }
                </div>
                <div class="form-group">
                    <label for="Category">Category :</label>
                    <select onChange={this.handleChange} name="category" class="form-control" id="Category">
                    <option value="">---</option>
                    {this.state.categories!=null && this.state.categories.map(item=>{
                        return <option value={item}>{item}</option>
                    })}
                    </select>
                    {this.state.category!=null && this.state.category.length==0?<h6 class="text-danger alert text-center">Category field Must be required</h6>:null }
                </div>

                <div class="form-group">
                    <label for="Description">Description :</label>
                    <textarea  onChange={this.handleChange} type="text" rows="5" class="form-control" name="description" id="Description" placeholder="About your product..."/>
                    {this.state.description!=null && this.state.description.length==0?<h6 class="text-danger alert text-center">Description Must be required</h6>:null }
                </div>
                <div class="form-group">
                    <label for="Rate">Rate :</label>
                    <input  onChange={this.handleChange} type="text" class="form-control" name="rate" id="Rate" placeholder="Rate of this product"/>
                    {this.state.rate!=null && this.state.rate.length==0?<h6 class="text-danger alert text-center">Rate Must be required</h6>:null }
                </div>
                <div class="form-group">
                    <label for="Rating">Rating :</label>
                    <input  onChange={this.handleChange} type="text" class="form-control" name="rating" id="Rating" placeholder="Initial Rating for this product"/>
                    {this.state.rating!=null && this.state.rating.length==0?<h6 class="text-danger alert text-center">Rating Must be required</h6>:null }
                </div>
                <div class="form-group">
                    <label for="Images">Images :</label>
                    <input  onChange={this.handleChange}  type="file" class="form-control" style={{border:'none'}} name="images" id="Images" multiple />
                    {this.state.images!=null&& this.state.images.length>0?Array.from(this.state.images).map(item=>{
                        return <p class="badge badge-pill badge-primary p-2 m-2">{item.name}</p>
                    }):null}
                    {this.state.images!=null && this.state.images.length==0?<h6 class="text-danger alert text-center">Product Images Must be required</h6>:null }
                </div>
                <input type="submit" class="btn btn-success" style={{display:'block',marginLeft:'auto',marginRight:'auto'}} value="Proceed"/>
                
                </form>
            </div>
         );
    }
}
 
export default AddProducts;