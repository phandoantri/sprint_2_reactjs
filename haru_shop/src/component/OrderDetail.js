import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import * as orderDetailService from "../service/OrderDetailService"
import "../css/orderDetail.css"
import {useDispatch} from "react-redux";
import {getAllCart1} from "./redux/action/cart";
export function OrderDetail() {
    const param=useParams()
    const [orderDetail,setOrderDetail]=useState([]);
    const dispatch=useDispatch()
    const fetchAllOrderDetail=async ()=>{
        const result=await orderDetailService.getAllOrderDetail(param.id)
        setOrderDetail(result)
        console.log(result)
    }
    useEffect(()=>{
        fetchAllOrderDetail()
    },[param.id])
    useEffect(()=>{
        dispatch(getAllCart1())
    },[])
return(
    <>
        <div>
            <h1 style={{marginTop:"140px",textAlign:"center"}}>Chi tiết đơn hàng</h1>
        <table className="table table-striped" style={{marginTop: "50px", marginBottom: "165px"}}>
         <thead>
         <tr>
             <th>Sản phẩm</th>
             <th>Tên sản phẩm</th>
             <th>Số lượng</th>
             <th>Gía tiền</th>
         </tr>
         </thead>
            <tbody>
            {
                orderDetail.map((od)=>(
                    <tr>
                        <td style={{marginRight:"15px"}}><img src={od.product.image} style={{width:"50px",height:"50px"}}/></td>
                        <td>{od.product.name}</td>
                        <td>{od.quantity}</td>
                        <td>{od.product.price.toLocaleString()} VND</td>
                    </tr>
                ))

            }
            </tbody>
        </table>
        </div>

        </>
)
}