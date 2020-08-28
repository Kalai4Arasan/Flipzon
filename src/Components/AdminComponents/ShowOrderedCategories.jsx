import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Axios from 'axios';
import StockNotFound from '../../asserts/logo/emptyStock.png'
import JwtDecode from 'jwt-decode';

const ShowOrderedCategories=({category})=>  {
        const location=useLocation()
        const history=useHistory()
        var cid
        if(category){
            cid=category
        }
        else{
            cid=location.state['cid']
        }
        const [allOrders,setAllOrders]=useState(null)

        
        useEffect(()=>{
            Axios.post('http://localhost:4200/allOrders',{cid}).then((res)=>{
                if(res.data.length>0){
                    setAllOrders(res.data)
                }
                else{
                    setAllOrders([])
                }
            })
        },[cid])

        if(!sessionStorage.getItem('Admin')){
            return history.push('/login')
        }
        if(allOrders!=null && allOrders.length==0){
            return (
                <img style={{marginTop:'2rem',display:'block',width:'40%',marginLeft:'auto',marginRight:'auto'}} src={StockNotFound}/>
            )
        }
        function addDate(item){
            if(document.getElementById(item.buyid).style.display=="none"){
                 document.getElementById(item.buyid).style.display="block"
            }
            else{
                document.getElementById(item.buyid).style.display="none"
            }
        }

        function submitDate(item){
            const shiping_date=document.getElementById(item.buyid+"shipping").value
            const delivery_date=document.getElementById(item.buyid+"delivery").value
            const Dates={
                'buyid':item.buyid,
                'shipping':shiping_date,
                'delivery':delivery_date
            }
            Axios.post('http://localhost:4200/addDates',{Dates}).then(res=>{
                if(res.data.length>0){
                    Axios.post('http://localhost:4200/allOrders',{cid}).then((res)=>{
                        if(res.data.length>0){
                            setAllOrders(res.data)
                        }
                        else{
                            setAllOrders([])
                        }
                    })
                }
            }).catch(err=>{console.log(err)})
            
        }
        return (
            <>
            <table class="table mt-2 animate__animated animate__fadeIn">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">ProductImage</th>
                    <th scope="col">ProductName</th>
                    <th scope="col">DeliveryAddress</th>
                    <th scope="col">OrderedDate</th>
                    <th scope="col">ShippingDate</th>
                    <th scope="col">DeliveryDate</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">TotalAmount</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders!=null && allOrders.length>0?allOrders.map(item=>{
                        return (<><tr>
                        <th scope="row">{allOrders.indexOf(item)+1}</th>
                        <td>{item.name}</td>
                        <td><img style={{height:'50px',width:'30px'}} src={require('../../asserts/productImages/'+item.images[0])}/></td>
                        <td>{item.productname}</td>
                        <td>{item.address}</td>
                        <td>{item.buying_date.substring(0,10)}</td>
                        <td class="text-center text-primary">{item.shiping_date==null&&item.delivery_date==null?<i class="fa fa-circle-o-notch fa-spin text-primary"></i>:item.shiping_date.substring(0,10)}</td>
                        <td class="text-center text-primary">{item.shiping_date==null&&item.delivery_date==null?<i class="fa fa-circle-o-notch fa-spin text-primary"></i>:item.delivery_date.substring(0,10)}</td>
                        <td class="text-success">{item.quantity}</td>
                        <td class="text-success">&#8377;{item.total_amount}</td>
                        {item.shiping_date==null&&item.delivery_date==null?<td><i class="fa fa-edit text-primary" onClick={()=>{addDate(item)}} style={{cursor:'pointer'}}></i>
                        <div class="form-group" style={{display:'none',width:'150px',justifyContent:'center'}} id={item.buyid}>
                                <label for={item.butid+'shipping'}>ShippingDate</label>
                                <input type="date" id={item.buyid+'shipping'} name="shipping" class="form-control form-control-sm mt-2" />
                                <label for={item.butid+'delivery'}>DeliveryDate</label>
                                <input type="date" id={item.buyid+'delivery'} name="delivery" class="form-control form-control-sm mt-2" />
                                <button class="btn btn-primary mt-2" onClick={()=>submitDate(item)}>Add</button>
                            </div>
                        </td>:null}
                        </tr>
                        </>
                        )
                    }):null}
                </tbody>
            </table>
            </>
         );
}
 
export default ShowOrderedCategories;