import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import numeral from 'numeral';
import { useDispatch } from "react-redux";

import * as orderService from "../service/OrderService"
import {getAllCart1} from "./redux/action/cart";

export function Vnpay (){
    const navigate = useNavigate();
    const [responseCode,setResponseCode] = useState();
    const [order,setOrder] = useState ();
    const [amount,setAmount] = useState();
    const [codePayment,setCodePayment] = useState();
    const dispatch = useDispatch();

    const getURL= () =>{
        const urlParams = new URLSearchParams(window.location.search);
        const responseCode = urlParams.get('vnp_ResponseCode');
        const totalPrice = urlParams.get('vnp_Amount');
        const code = urlParams.get('vnp_BankTranNo');
        setAmount(totalPrice);
        setResponseCode(responseCode);
        setCodePayment(code);
    }


    const display = () =>{
        if (responseCode == "00") {
            Swal.fire({
                icon:"success",
                timer:2000,
                title:"Thanh toán thành công",
                showConfirmButton:false
            }).then( async()=>{
                const data = await orderService.saveOrder(amount/100);
                setOrder(data);
                dispatch(getAllCart1());
                navigate("/")
            })
        }else{
            Swal.fire({
                icon:"error",
                timer:2000,
                title:"Thanh toán thất bại",
                showConfirmButton:false
            }).then(()=>{
                navigate("/");
            })
        }
    }

    console.log(order);

    useEffect(()=>{
        getURL();
    },[])

    useEffect(()=>{
        display();
    },[responseCode])

    if(!order){
        return null;
    }

    return(
        <>
            <div className='return'>
                <div className='return-conten'>
                    {responseCode==0?
                        <>
                            <h2>Thanh toán thành công !</h2>
                            <img width="180px" src='https://media.istockphoto.com/id/1348129920/vi/vec-to/d%E1%BA%A5u-ki%E1%BB%83m-ho%E1%BA%B7c-d%E1%BA%A5u-t%C3%ADch-%C4%91%C6%B0%E1%BB%A3c-ph%C3%A2n-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-k%C3%BD-ph%C3%AA-duy%E1%BB%87t-ch%E1%BA%A5p-nh%E1%BA%ADn-tr%E1%BA%A3-l%E1%BB%9Di-%C4%91%C3%BAng-%C4%91%C3%BAng.jpg?s=612x612&w=0&k=20&c=hMe-5y-5nwwL5jsXBobJuHUpJg-8iVG9C1jsHOnFycc='></img>
                            <p style={{fontSize:"14px"}}>Thanh toán đã thực hiện thành công.</p>
                            <table  width={"100%"} style={{marginBottom:"30px"}}>
                                <tr style={{height:"50px"}}>
                                    <td style={{textAlign:"left", paddingLeft:"60px"}}>Hình thức thanh toán</td>
                                    <td style={{textAlign:"right", paddingRight:"60px",width:"300px"}}>Chuyển khoảng NCB</td>
                                </tr>

                                <tr style={{height:"50px"}}>
                                    <td style={{textAlign:"left", paddingLeft:"60px"}}>Số điện thoại</td>
                                    <td style={{textAlign:"right", paddingRight:"60px"}}>{order.customer.phoneNumber}</td>
                                </tr>
                                <tr style={{height:"50px"}}>
                                    <td style={{textAlign:"left", paddingLeft:"60px"}}><b>Số tiền</b></td>
                                    <td style={{textAlign:"right", paddingRight:"60px"}}><b>{numeral(amount/100).format("00,0 đ")} VNĐ</b></td>
                                </tr>
                                <tr style={{height:"50px"}}>
                                    <td style={{textAlign:"left", paddingLeft:"60px"}}>Mã giao dịch</td>
                                    <td style={{textAlign:"right", paddingRight:"60px"}}>{codePayment}</td>
                                </tr>
                            </table>
                            <button className='btn-plus' onClick={()=>{navigate("/")}}>
                                Tiếp tục mua sắm
                            </button>
                        </>
                        :
                        <>
                            <div style={{height:"550px"}}>

                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}