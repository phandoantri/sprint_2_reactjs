import "../css/login.css"
import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import axios from "axios";
import {useNavigate} from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";
import {getAllCart1} from "./redux/action/cart";
export function Login() {
const navigate=useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return(
    <>
        <div id="login">
            <div className="wrapper" >
                <Formik
                initialValues={{
                    username:"",
                    password:""
                }}
                validationSchema={Yup.object({
                    username:Yup.string().required("Vui lòng nhập tài khoản"),
                    password:Yup.string().required("Vui lòng nhập mật khẩu")
                })}
                onSubmit={async (values,{setSubmitting})=>{
                    try {
                        // Gửi yêu cầu đăng nhập
                        const response = await axios.post(
                            "http://localhost:8080/api/user/authenticate",
                            values
                        );

                        // Kiểm tra nếu response có chứa token
                        if (response.data.token) {
                            // Giải mã token và lấy thông tin payload

                            // const decodedToken = jwt(response.data.token);
                            // Lưu trữ thông tin người dùng vào localStorage hoặc state
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("username", response.data.username);
                            localStorage.setItem("role", response.data.role);
                            // localStorage.setItem('userId', decodedToken.userId);

                        }
                        navigate("/");
                    } catch (e) {
                        toast.error(e.response.data);
                    } finally {
                        setSubmitting(false);
                    }
                }}

                >
                    <Form action="#">
                        <h2 style={{fontWeight:"bold"}}>Đăng nhập</h2>
                        <div className="input-field">
                            <Field type="text" name="username" required/>
                            <label>Nhập email</label>
                        </div>
                        <ErrorMessage name="username" component="span" className="err-mess"/>
                        <div className="input-field">
                            <Field type="password" name="password" required/>
                            <label>Nhập mật khẩu</label>
                        </div>
                        <ErrorMessage name="password" component="span" className="err-mess"/>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember"/>
                                <p>Ghi nhớ</p>
                            </label>
                            <a href="#">Quên mật khẩu?</a>
                        </div>
                        <button type="submit">Đăng nhập</button>
                        <div className="register">
                            <p>Chưa có tài khoản? <a href="#">Đăng ký</a></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
        <ToastContainer/>
        </>
)
}