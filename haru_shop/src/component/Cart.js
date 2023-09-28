import React, {useEffect, useState} from "react";
import "../css/cart.css"
import {NavLink} from "react-router-dom";
import * as cartService from "../service/CartService"
import {PayPalButton} from "react-paypal-button-v2";
import {toast, ToastContainer} from "react-toastify";
import * as orderService from "../service/OrderService"
import {useDispatch, useSelector} from "react-redux";
import {getAllCart1} from "./redux/action/cart";
import Swal from "sweetalert2";
import * as vnPay from "../service/VnpayService"
import "react-toastify/dist/ReactToastify.css";
import {getAllProduct} from "../service/ProductService";



export function Cart() {
    const [total, setTotal] = useState(0);
    const [products,setProduct]=useState([])
    const [showPaymentForm, setShowPaymentForm] = useState(false)
    const [carts, setCart] = useState([]);
    const dollar = Math.floor(total / 23500);
    const [hasProducts, setHasProducts] = useState(carts.length > 0);
    const dispatch=useDispatch();


    const getAllCart = async () => {
        const result = await cartService.getAllCart();
        setCart(result);
    }
    useEffect(() => {
        getAllCart()

    }, [])
    useEffect(() => {
        setHasProducts(carts.length > 0);
    }, [carts]);

    const handlePayment = () => {
        setShowPaymentForm(true);
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);


    const handleMinus = async (productId, cartId) => {
        const updatedCarts = carts.map((cart) => {
            if (cart.product.id === productId) {
                const newQuantity = cart.quantity - 1;
                if (newQuantity >= 1) {
                    // Gọi API để cập nhật số lượng trong cơ sở dữ liệu
                    cartService.setQuantityShopping(newQuantity, cartId)
                        .then(() => {
                            // Cập nhật số lượng trong ReactJS
                            setCart((prevState) =>
                                prevState.map((prevCart) =>
                                    prevCart.product.id === productId
                                        ? {...prevCart, quantity: newQuantity}
                                        : prevCart
                                )
                            );
                        })
                        .catch((error) => {
                            console.error(error);
                            // Xử lý lỗi khi không thể cập nhật số lượng trong cơ sở dữ liệu
                        });
                }
            }
            return cart;
        });
        setCart(updatedCarts);
    };

    // const handlePlus = async (productId, cartId) => {
    //     const updatedCarts1 = carts.map((cart) => {
    //         if (cart.product.id === productId ) {
    //             let newQuantity = cart.quantity + 1;
    //             if (newQuantity >= 1) {
    //                 // Gọi API để cập nhật số lượng trong cơ sở dữ liệu
    //                 cartService.setQuantityPlus(newQuantity, cartId)
    //                     .then(() => {
    //                         // Cập nhật số lượng trong ReactJS
    //                         setCart((prevState) =>
    //                             prevState.map((prevCart) =>
    //                                 prevCart.product.id === productId
    //                                     ? {...prevCart, quantity: newQuantity}
    //                                     : prevCart
    //                             )
    //                         );
    //                     })
    //                     .catch((error) => {
    //                         toast.error("Số lượng sản phẩm trong giỏ hàng vượt quá số lượng trong kho.!!")
    //                     });
    //             }
    //         }
    //         return cart;
    //     });
    //     setCart(updatedCarts1);
    // };
    const handlePlus = async ( quantity, id) => {
        try {
            if (quantity > 1 ) {
                await cartService.setQuantityPlus(quantity, id);
                getAllCart()
            }
        }catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = carts.reduce(
                (accumulator, cart) => accumulator + cart.product.price * cart.quantity,
                0
            );
            setTotal(totalPrice);
        };

        calculateTotal();
    }, [carts]);

    const handleDelete = async (id) => {
        await cartService.deleteProductFromCart(id)
        await dispatch(getAllCart1())
        getAllCart()
    }
useEffect(()=>{
    dispatch(getAllCart1())
},[])
    const save=async (totals)=> {
        try {
            await orderService.saveOrder(totals)
            dispatch(getAllCart1())
            await getAllCart()

        }catch (e) {
            console.log(e)
        }

    }

    const vnpayPayment = async (total) => {
        const data = await vnPay.payWithVNpay(total);
        window.location.href = data;
    };
    return (
        <>
            <div className="tri" style={{backgroundColor: "#d2c9ff"}}>
                <div className="container  h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Giỏ Hàng</h1>
                                                    <h3 className="mb-0 text-muted"></h3>
                                                </div>
                                                <hr className="my-4"/>


                                                {
                                                    carts.length>0?

                                                    carts.map((cart) => (
                                                        <div
                                                            className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={cart.product.image}
                                                                    className="img-fluid rounded-3" alt=""/>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <p className="text-muted"
                                                                   style={{fontWeight: "bold"}}>{cart.product.name}</p>

                                                            </div>
                                                            <div
                                                                className="col-md-3 col-lg-3 col-xl-2 d-flex buy-amount">

                                                                <button style={{textAlign: "center"}}
                                                                        onClick={() => handleMinus(cart.product.id, cart.id)}
                                                                        disabled={cart.quantity === 1}>
                                                                    <i className="fa-solid fa-minus"></i>
                                                                </button>

                                                                <input style={{fontSize:"15px"}} min="0" name="quantity" value={cart.quantity}
                                                                       type="number"
                                                                       className="form-control form-control-sm amount"/>

                                                                <button
                                                                    onClick={() => handlePlus(cart.product.id, cart.id,cart.quantity)}>
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <p className="mb-0"
                                                                   style={{fontWeight: "bold"}}>{(cart.product.price * cart.quantity).toLocaleString()} VND</p>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <button type="button"
                                                                        data-bs-target="#exampleModal" onClick={() => {
                                                                    Swal.fire({
                                                                        icon: "warning",
                                                                        title: "Xóa",
                                                                        html: `Bạn có muốn xoá sản phẩm này không`,
                                                                        showCancelButton: true,
                                                                        cancelButtonText: "Hủy",
                                                                        confirmButtonText: "Có",
                                                                        cancelButtonColor: "rgba(118,112,112,0.51)",
                                                                        confirmButtonColor: "#d33"
                                                                    })
                                                                        .then((res) => {
                                                                            if (res.isConfirmed) {
                                                                                handleDelete(cart.id)
                                                                            }
                                                                        })

                                                                }}
                                                                        className="text-muted"><i
                                                                    className="fas fa-times"></i></button>
                                                            </div>
                                                        </div>
                                                    )):
                                                        <div style={{height:"195px"}}>
                                                        <p style={{textAlign:"center"}}>Không có sản phẩm nào trong giỏ hàng</p>
                                                        </div>


                                                }


                                                <div className="pt-5">
                                                    <p className="mb-0"><NavLink to="/" className="text-body"
                                                                                 style={{fontWeight: "bold"}}><i
                                                        className="fas fa-long-arrow-alt-left me-2"></i>Trở lại
                                                        shop</NavLink>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Hóa đơn</h3>

                                                <hr className="my-4"/>

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Tổng tiền</h5>
                                                    <h5>{total.toLocaleString()} VND</h5>
                                                </div>

                                                {hasProducts && (
                                                    <PayPalButton
                                                        amount={parseFloat(dollar)}
                                                        onSuccess={(details, data) => {
                                                            save(total);
                                                            toast.success("Đã thanh toán thành công");

                                                            return fetch("/paypal-transaction-complete", {
                                                                method: "post",
                                                                body: JSON.stringify({
                                                                    orderID: data.orderID
                                                                })
                                                            });
                                                        }}
                                                    />

                                                )}
                                                {
                                                    hasProducts && <button type="button" onClick={()=>vnpayPayment(total)}><img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" width="330px" height="125px"/></button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}