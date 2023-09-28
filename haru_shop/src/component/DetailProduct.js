import "../css/detail.css"
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import * as productService from "../service/ProductService"
import {Formik} from "formik";
import Swal from "sweetalert2";
import * as cartService from "../service/CartService";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {getAllCart1} from "./redux/action/cart";

export function DetailProduct() {
    const param = useParams()
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1)
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    useEffect(() => {
        const getProduct = async () => {
            const result = await productService.detailProduct(param.id)
            setProduct(result);
        }
        getProduct();
        dispatch(getAllCart1())
    }, [param.id])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    if (!product) {
        return null;
    }

    const addToCart = async (quantity, idProduct) => {
        try {
            if (quantity < 1) {
                await Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Số lượng phải lớn hơn 0',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            if (token == null) {
                await Swal.fire({
                    icon: "warning",
                    text: "Bạn phải đăng nhập mới có thể thêm vào giỏ hàng",
                });
                navigate("/login");
            } else {
                await cartService.add(quantity, idProduct);
                dispatch(getAllCart1());
                await toast.success("Thêm vào giỏ hàng thành công");
            }
        } catch (e) {
            return toast.error(e.response.data);
        }
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncrease = () => {
        if (quantity<product.quantity)
        setQuantity(quantity + 1);
    };

    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity<=product.quantity){
            setQuantity(newQuantity);
        }


    };
    // const handleChange = (event) => {
    //
    //         setQuantity(parseInt(event.target.value, 10));
    //
    //
    //
    // };

    return (
        <>
            <div className="box-container" id="detail">
                <h1 className="heading"><span>Chi tiết</span> sản phẩm</h1>
                <div className="box">

                    <div className="image-container">
                        <div className="big-image">
                            <img
                                src={product.image}
                                className="big-img" alt=""/>
                        </div>
                    </div>

                    <div className="content">
                        <h3>Giới thiệu sản phẩm</h3>
                        <p style={{fontWeight: "bold"}}>-Tên sản phẩm : {product.name}</p>
                        <p>-Mô tả: {product.description}</p>
                        <p> -Trọng lượng: {product.weight} KG</p>
                        <p> -Số lượng: {product.quantity} sản phẩm</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <div className="price">{product.price.toLocaleString()} VND</div>
                        <div>
                            <div className="aaa">
                                <button className="button-detail" onClick={handleDecrease}>-</button>
                                <input className="input-detail" type={"number"} value={quantity} onChange={handleChange}/>
                                <button className="button-detail" onClick={handleIncrease}>+</button>
                            </div>
                            {
                                product.quantity!==0 ?
                                <button onClick={() => addToCart(quantity, product.id)} className="btn tang-giam">Mua Ngay
                                </button>  :
                                    <button className="btn tang-giam">Hết hàng</button>
                            }

                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}