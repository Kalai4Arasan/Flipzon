import React ,{Component} from 'react'
import Loading from '../ProductsComponents/Loading'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Products extends Component{
    constructor(props){
        super(props)
        this.state={
            produts:null,
            isLoading:true,
        }
    }
    componentDidMount(){
        Axios.get('http://localhost:4200/allProducts').then((res)=>{
            if(res.data.length>0){
                this.setState({produts:res.data})
                this.setState({isLoading:false})
            }
        })
    }
    render(){
        console.log(this.state.produts)
        if(this.state.isLoading){
            return <Loading/>
        }
        return (
            
            <div class="mt-3">
                <h4 style={{marginBottom:'2rem'}}>All Products:<span class="float-right"><Link class="btn btn-primary" to="/addProducts"><i class="fa fa-plus"></i> Add Products</Link></span></h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Category</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Description</th>
                        <th scope="col">RelatedImages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.produts.map(item=>{
                               return( <tr>
                                <th scope="row">{this.state.produts.indexOf(item)+1}</th>
                                <td>{item.productname}</td>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>&#8377;{parseFloat(item.rate).toFixed(2)}</td>
                                <td>&#8377;{parseFloat(item.discount).toFixed(2)}</td>
                                <td>
                                    <p style={{maxHeight:'100px',width:'300px',overflow:'hidden',textOverflow:'ellipsis'}}>
                                    {item.description}
                                    </p><span style={{display:'flex',marginTop:'-25px'}}>...</span>
                                </td>
                                <td>{item.images.map(image=>{return <img height="40" width="40" style={{margin:'.2rem'}} src={require('../../asserts/productImages/'+image)}/>})}</td>
                                </tr> )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Products