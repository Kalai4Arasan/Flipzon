import React ,{Component} from 'react'
import Axios from 'axios'
import Loading from '../ProductsComponents/Loading'
import { Redirect } from 'react-router-dom'

class Categories extends Component{
    constructor(props){
        super(props)
        this.state={
            categories:null,
            isLoading:true,
            category:null,
            errors:{
                category:null,
                ferror:null,
            }
        }
    }
    componentDidMount(){
        Axios.get('http://localhost:4200/getCategories').then((res)=>{
            this.setState({categories:res.data})
            this.setState({isLoading:false})
        })
    }
    handleChange=(e)=>{
        if(this.state.errors.ferror!=null){
        this.setState({errors:{ferror:null}})
        }
        const name=e.target.name
        const value=e.target.value
        this.state.errors.category=value.length>0?null:"category field must be required..."
        this.setState({[name]:value})
    }

    handleSubmit=()=>{
        if(this.state.category!=null && this.state.category.length>0){
            let valid=true
            for (let item of this.state.categories){
                if(item.category.toLowerCase()==this.state.category.toLowerCase()){
                    valid=false
                }
            }
            if(valid){
            const Category=this.state.category
            Axios.post('http://localhost:4200/addCategory',{Category}).then((res)=>{
                    this.setState({categories:res.data})
            })
            }
            else{
                this.setState({errors:{ferror:"Category Already Exist"}})
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
                    <h4>Add Categories</h4><hr/>
                    <div style={{padding:'10rem'}}>
                        <input class="form-control" onChange={this.handleChange} name="category" placeholder="Enter Category..."/>
                        {this.state.errors.category!=null && this.state.errors.category.length>0?<small class="text-danger">{this.state.errors.category}<br/></small>:null }
                        {this.state.errors.ferror!=null && this.state.errors.ferror.length>0?<small class="text-danger">{this.state.errors.ferror}<br/></small>:null }
                        <button class="btn btn-outline-info mt-3" onClick={()=>this.handleSubmit()}><i class="fa fa-plus"> Add</i></button>
                    </div>
                </div>
                <div class="col-md-6">
                {this.state.isLoading===true?<Loading/>:
                    <div style={{padding:'5rem'}}>
                    <strong >Available Categories:</strong>
                    <ul class="list-group mt-3" style={{height:'350px',overflowY:'scroll'}} >
                        {this.state.categories.map(item=>{
                            return(
                            <li class="list-group-item link-hover font-size-bolder"  style={{cursor:'pointer',fontSize:'12px'}}>{this.state.categories.indexOf(item)+1}.{item.category.toUpperCase()}</li>
                            )
                        })}
                    </ul>
                    </div>
                }
                </div>
            </div>
        )
    }
}
export default Categories