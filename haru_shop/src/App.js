import logo from './logo.svg';
import './App.css';
import {Header} from "./component/Header";
import React, {useEffect, useState} from "react";
import {Footer} from "./component/Footer";
import {ListProduct} from "./component/ListProduct";
import {DetailProduct} from "./component/DetailProduct";
import {Login} from "./component/Login";
import {Route, Routes} from "react-router";
import {Cart} from "./component/Cart";
import * as productService from "./service/ProductService"
import {Order} from "./component/Order";
import {OrderDetail} from "./component/OrderDetail";
import {UserDetail} from "./component/UserDetail";
import {Vnpay} from "./component/Vnpay";

function App() {
    // useEffect(()=>{
    //     <Header/>
    // },[])

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<ListProduct/>}/>
                <Route path="/detail/:id" element={<DetailProduct/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/orderDetail/:id" element={<OrderDetail/>}/>
                <Route path="/userDetail" element={<UserDetail/>}/>
                <Route path="/vnpay" element={<Vnpay/>}/>
            </Routes>
            <div>
                <Footer/>
            </div>

        </>
    );
}

export default App;
