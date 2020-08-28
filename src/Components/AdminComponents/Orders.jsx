import React ,{Component} from 'react'
import Axios from 'axios'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Loading from '../ProductsComponents/Loading'
import ShowOrderedCategories from './ShowOrderedCategories'

class Orders extends Component{
    constructor(props){
        super(props)
        this.state={
            allOrders:null,
            categories:null,
            isLoading:true,
        }
    }
    componentDidMount(){
        Axios.get('http://localhost:4200/getCategories').then((res)=>{
                    if(res.data.length>0){
                        this.setState({categories:res.data})
                        this.setState({isLoading:false})
                    }
                })
    }
    render(){
        if(this.state.isLoading){
            return <Loading/>
        }
        console.log(this.state)
        return (

            <div>
                <h3>All Orders:</h3>
                <hr/>
                <div class="btn-group">
                    {this.state.categories!=null && this.state.categories.length>0?this.state.categories.map(item=>{
                        return(
                            <Link class="btn btn-success" to={
                                {
                                    pathname:"/ordersCategory",
                                    state:{cid:item.cid}
                                }
                            }>{item.category}</Link>
                        )
                    }):null}
                </div>
                
                <Switch>
                `   <Route path="/orderedProducts">
                        <ShowOrderedCategories category={this.state.categories[0].cid}/>
                    </Route>
                    <Route path="/ordersCategory">
                        <ShowOrderedCategories/>
                    </Route>
                </Switch>
            </div>
        )
    }
}
export default Orders