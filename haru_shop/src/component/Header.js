import "../css/header.css"
import {Link, NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Field, Form, Formik} from "formik";
import * as productService from "../service/ProductService"
import {ListProduct} from "./ListProduct";
import {useSelector} from "react-redux";

export function Header() {
    const username = localStorage.getItem('username')
    const [isLogin, setIsLogin] = useState();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [productType, setProductType] = useState([])
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    useEffect(() => {
        if (token) {
            setIsLogin(true)
            // setUserName(currentUserName)
        } else {
// Xử lý khi không có token trong localStorage
        }
    }, [token])
    const handlerLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        setIsLogin(false)
        toast.success("Đăng xuất thành công")
        navigate("/login")
    }
    useEffect(() => {
        const getProductType = async () => {
            const result = await productService.getAllTypeProduct()
            setProductType(result)
        }
        getProductType()
    }, [])

    const handle=()=> {
        window.scrollTo(0, 1650);
    }


    const iconQuantity = useSelector(state => state.cart)


    return (
        <>
            <header className="header">

                <NavLink to="/" className="logo" > <img src="/./img/logomeo1.png" style={{width:"60px",height:"60px"}}/>  Haru Store </NavLink>

                <Formik
                initialValues={{
                    name:""
                }}
                onSubmit={(values)=>{
                    const result = async () => {
                        navigate("/?name="+values.name)
                    }
                    result();
                }}
                >

                    <Form>
                        <nav className="navbar">
                            <Link to="/">Trang chủ</Link>
                            <Link onClick={()=>handle()} to="/">Sản phẩm</Link>
                            <Field type='text' name="name"
                                   style={{height: '40px', width: "200px", borderRadius: '10px', marginLeft: "15px"}}/>
                            <button className='btn m-2' type="submit" >Tìm kiếm</button>
                        </nav>
                    </Form>
                </Formik>

                <div className="icons">
                    {/*{isLogin ? (*/}
                    {/*    <div className="dropdown">*/}
                    {/*        <button style={{border:"none",backgroundColor:"#e8e2e2",color:"black"}} onClick={toggleDropdown}>*/}
                    {/*            {username}*/}
                    {/*        </button>*/}
                    {/*        {dropdownOpen && (*/}
                    {/*            <div className="dropdown-content">*/}
                    {/*                <NavLink to="/order" style={{color:"black",backgroundColor:"#e8e2e2"}} >Lịch sử giao dịch</NavLink>*/}
                    {/*                <button type="submit" onClick={handlerLogout} style={{color:"black",border:"none",backgroundColor:"#e8e2e2"}}>*/}
                    {/*                    <i className="bi bi-box-arrow-right"></i> Đăng xuất*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}

                    {/*) : (*/}
                    {/*    <Link to="/login" className="cart-icon" style={{fontSize: "15px"}}>*/}
                    {/*        <i className="fa-solid fa-user"></i>*/}
                    {/*        Đăng nhập*/}
                    {/*    </Link>*/}
                    {/*)}*/}
                    {/*{*/}
                    {/*    role === 'ROLE_ADMIN' ? "" :*/}
                    {/*    <Link to="/cart" className="account-icon" style={{fontSize: "15px"}}>*/}
                    {/*        <i className="fa-solid fa-cart-shopping" ></i>*/}
                    {/*        <span><sup className="align-items-lg-center" style={{color:"red"}}>({iconQuantity})</sup></span>*/}
                    {/*    </Link>*/}
                    {/*}*/}
                    {isLogin ? (
                        <div className="dropdown">
                            <button style={{ border: "none", backgroundColor: "#e8e2e2", color: "black" }} onClick={toggleDropdown}>
                                {username}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-content">
                                    <div>
                                        <button style={{ color: "black", border:"none" ,backgroundColor: "#e8e2e2" }}><NavLink to="/userDetail" style={{color:"black"}} >
                                            Thông tin khách hàng
                                        </NavLink></button>
                                    </div>
                                 <div>
                                   <button style={{ border:"none",backgroundColor: "#e8e2e2"}}><NavLink to="/order" style={{color:"black"}} >
                                       Lịch sử giao dịch
                                   </NavLink></button>
                                 </div>

                                    <button type="submit" onClick={handlerLogout} style={{ color: "black", border: "none", backgroundColor: "#e8e2e2" }}>
                                        <i className="bi bi-box-arrow-right"></i> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="cart-icon" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-user"></i>
                            Đăng nhập
                        </Link>
                    )}
                    {isLogin && role !== 'ROLE_ADMIN' && (
                        <Link to="/cart" className="account-icon" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>
      <sup className="align-items-lg-center" style={{ color: "red" }}>
        ({iconQuantity})
      </sup>
    </span>
                        </Link>
                    )}

                </div>
            </header>
            <ToastContainer/>
        </>
    )
}