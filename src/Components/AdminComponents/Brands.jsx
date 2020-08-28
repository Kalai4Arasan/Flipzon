import React ,{Component} from 'react'
import Axios from 'axios'
import Loading from '../ProductsComponents/Loading'
import { Redirect } from 'react-router-dom'
import './AdminComponents.css'

class Brands extends Component{
    constructor(props){
        super(props)
        this.state={
            brands:null,
            isLoading:true,
            categories:null,
            brand:null,
            category:null,
            categoryList:[],
            errors:{
                brand:null,
                ferror:null,
                category:null,
            }
        }
    }
    componentDidMount(){
        const Data={}
        Axios.get('http://localhost:4200/getBrands').then((res)=>{
            for(let item of res.data){
                if(item.brand in Data){
                    Data[item.brand].push(item.category)
                }
                else{
                    Data[item.brand]=[item.category]
                }
            }
            this.setState({brands:Data})
            this.setState({isLoading:false})
        })
        Axios.get('http://localhost:4200/getCategories').then((res)=>{
                    this.setState({categories:res.data})
                    // window.alert(this.state.categories)
                })
    }
    handleChange=(e)=>{
        if(this.state.errors.ferror!=null){
        this.setState({errors:{ferror:null}})
        }
        const name=e.target.name
        const value=e.target.value
        switch(name){
            case "brand":
                this.state.errors.brand=value.length>0?null:"brand field must be required..."
                break
            case "category":
                this.state.errors.category=value.length>0?null:"brand field must be required..."
                break

        }
        this.setState({[name]:value})
    }

    handleCategory=(e)=>{
        if(this.state.category!=null && this.state.category.length>0){
            if(this.state.categoryList.indexOf(this.state.category)==-1){
                this.state.categoryList.push(this.state.category)
                this.setState({categoryList:this.state.categoryList})
            }
            else{
                this.setState({errors:{category:"Already added"}})
            }
        }
        else{
            this.setState({errors:{category:"Please Select a category"}})
        }
    }
    cancelCategory=(item)=>{
        this.state.categoryList.splice(this.state.categoryList.indexOf(item),1)
        this.setState({categoryList:this.state.categoryList})
    }

    handleSubmit=()=>{
        console.log(this.state)
        if(this.state.brand!=null && this.state.brand.length>0 && this.state.categoryList.length>0){
            let valid=true
            for (let item of Object.keys(this.state.brands)){
                if(item.toLowerCase()==this.state.brand.toLowerCase()){
                    valid=false
                }
            }
            if(valid){
            const Brand={"brand":this.state.brand,"CategoryList":this.state.categoryList}
            Axios.post('http://localhost:4200/addBrand',{Brand}).then((res)=>{
                const Data={}
                for(let item of res.data){
                    if(item.brand in Data){
                        Data[item.brand].push(item.category)
                    }
                    else{
                        Data[item.brand]=[item.category]
                    }
                }
                this.setState({categoryList:[]})
                this.setState({category:null})
                this.setState({brand:null})
                document.getElementById('brand').value=""
                this.setState({brands:Data})
            })
            }
            else{
                this.setState({errors:{ferror:"brand Already Exist"}})
            }
        }
        else{
            this.setState({errors:{ferror:"Please give a vallid input..."}})
        }

    }

    render(){
        if(!sessionStorage.getItem('Admin')){
            return <Redirect to="/adminLogin"/>
        }
        return (
            <div class="row mt-4 animate__animated animate__fadeIn">
                <div class="col-md-6" style={{borderRight:'1px solid rgba(0,0,0,.1)'}}>
                    <h4>Add Brands</h4><hr/>
                    <div style={{padding:'6rem'}}>
                        <label for="brand" class="font-weight-bolder mt-2">Brands:</label>
                        <input id="brand" class="form-control" onChange={this.handleChange} name="brand" placeholder="Enter brands..."/>
                        {this.state.errors.brand!=null && this.state.errors.brand.length>0?<h6 class="text-danger alert text-center">{this.state.errors.brand}</h6>:null }
                        <label for="category" class="font-weight-bolder mt-2">Categories:</label>
                        <select id="category" class="form-control" onChange={this.handleChange} name="category">
                         <option value="">---</option>
                        {this.state.categories!=null&&this.state.categories.map(item=>{
                            return <option value={item.category}>{item.category}</option>
                        })}
                        </select>
                        <span style={{display:'flex',marginLeft:'308px',marginTop:'-38px'}}><i class="fa fa-plus btn btn-success text-center" onClick={()=>this.handleCategory()} style={{height:'2.3rem',width:'3rem'}}></i></span>
                        {this.state.errors.category!=null && this.state.errors.category.length>0?<h6 class="text-danger alert text-center">{this.state.errors.category}</h6>:null }
                        <div class="m-2">
                        {this.state.categoryList!=null&&this.state.categoryList.length>0?
                        this.state.categoryList.map(item=>{
                            return <p class="badge badge-pill badge-warning ml-2">{item} <i class="fa fa-times text-primary" onClick={()=>this.cancelCategory(item)} style={{cursor:'pointer'}}></i></p>
                        })
                        :<small>No Categories Selected till now</small>}
                        </div>

                        {this.state.errors.ferror!=null && this.state.errors.ferror.length>0?<h6 class="text-danger alert text-center">{this.state.errors.ferror}</h6>:null }
                        <button class="btn btn-outline-info mt-3" style={{display:'block',marginLeft:'auto',marginRight:'auto'}} onClick={()=>this.handleSubmit()}>Add</button>
                    </div>
                </div>
                <div class="col-md-6">
                {this.state.isLoading===true?<Loading/>:
                    <div style={{padding:'3rem'}}>
                    <strong >Available Brands:</strong>
                    <div style={{height:'350px',overflowY:'scroll',marginTop:'1rem'}}>
                    <table class="table mt-3" >
                        {Object.keys(this.state.brands).map(key=>{
                            return (<tr>
                                <td>
                                    <strong>{key.toUpperCase()}</strong>
                                    <ul class="list-group">
                                {this.state.brands[key].map(item=>{
                                    return(
                                        <li class="list-group-item">{this.state.brands[key].indexOf(item)+1}. {item.toUpperCase()} </li>                                        )
                                })}
                                    </ul>
                                </td>
                            </tr>)
                        })}
                    </table>

                    </div>
                    </div>
                }
                </div>
            </div>
        )
    }
}
export default Brands