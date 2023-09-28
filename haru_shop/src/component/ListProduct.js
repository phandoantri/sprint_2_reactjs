import React, {useEffect, useRef, useState} from "react";
import "../css/home.css"
import * as productService from "../service/ProductService"
import {Link, NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {Field, Form, Formik} from "formik";
import {animateScroll as scroll} from "react-scroll";
import {getAllProduct} from "../service/ProductService";
import * as cartService from "../service/CartService"
import * as Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import {getAllCart1} from "./redux/action/cart";
import {useDispatch} from "react-redux";
import drop from "../img/mui_ten_len.png"


export function ListProduct() {
    const [backToTop, setBackToTop] = useState(false);
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [products, setProduct] = useState([]);
    const [productType, setProductType] = useState([])
    const [idDelete, setIdDelete] = useState();
    const [nameDelete, setNameDelete] = useState();
    const role = localStorage.getItem('role')
    const [searchParam, setSearchParam] = useSearchParams()
    const [nameSearch, setNameSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');
    const [isCartClickable, setIsCartClickable] = useState(true);
    const contractsPerPage = 6;
    const indexOfLastContract = currentPage * contractsPerPage;
    const indexOfFirstContract = indexOfLastContract - contractsPerPage;
    const dispatch = useDispatch();
    const currentContracts = products.slice(
        indexOfFirstContract,
        indexOfLastContract
    );

    const totalPages = Math.ceil(products.length / contractsPerPage);
    const shouldHidePagination = totalPages <= 1;

    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
        const scrollToY = 1550;

        window.scrollTo({
            top: scrollToY,
            behavior: "smooth",
        });
    };

        const getAllProduct = async () => {
            const result = await productService.getAllProduct();
            setProduct(result.content);
        }

    useEffect(() => {
        const getAllTypeProduct = async () => {
            const result = await productService.getAllTypeProduct();
            setProductType(result);
        }
        getAllTypeProduct();
    }, [])

    const deleteProduct = async (id) => {
        await productService.deleteProduct(id)
        const result = await productService.getAllProduct();
        setProduct(result.content);
    }

    function deleteByName(id, name) {
        setIdDelete(id);
        setNameDelete(name);
    }


    const handleSubmit = async (id) => {
        const result = await productService.searchProductByTypeProduct(id)
        setProduct(result)
        const scrollToY = 1650;
        window.scrollTo({
            top: scrollToY,
            behavior: "smooth",
        });
    }

    const findProduct = async (nameSearch) => {
        const result = await productService.searchProductByName(nameSearch || "");
        setProduct(result);
    }


    useEffect(() => {
        if (searchParam) {
            setNameSearch(searchParam.get('name'));
        }
        findProduct(searchParam.get('name'));
        if (nameSearch === "") {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 1650);
        }
    }, [searchParam])

    const addToCart = async (quantity, idProduct) => {
        try {
            if (token == null) {
                await Swal.fire({
                    icon: "warning",
                    text: "Bạn phải đăng nhập mới có thể thêm vào giỏ hàng",
                })
                navigate("/login")
            } else {
                await cartService.add(quantity, idProduct)
                await dispatch(getAllCart1())
                await toast.success("Thêm vào giỏ hàng thành công")
            }

        } catch (e) {
            return toast.error(e.response.data)
        }
    }
    useEffect(() => {
        getAllProduct()
        dispatch(getAllCart1())

    }, [])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.screenY > 100) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        })
    }, [])
    const
        scrollUp = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }




    return (
        <>

            <section className="home" id="home">

                <div className="content">
                    <h3 style={{color: "white"}}>Mua Thức Ăn <br/>Thú Cưng Thích</h3>
                    <h4 style={{color: "white"}}>Cả thế giới có thể quay lưng với bạn nhưng thú cưng thì không. Vì vậy
                        hãy dành cho
                        thú cưng của bạn những điều tuyệt vời nhất.</h4>
                </div>
            </section>


            <section className="banner">
                <div className="box-container">


                    {
                        productType.map(pt => (
                            <div className="box">
                                <img
                                    src={pt.image}
                                    alt=""/>
                                <div className="content">
                                    <button onClick={() => handleSubmit(pt.id)}>{pt.name}</button>
                                </div>
                            </div>


                        ))

                    }
                </div>

            </section>


            <section className="products" id="product">
                {backToTop && (
                    <button style={{height: "50px", width: "50px"}}
                            onClick={scrollUp}>^</button>
                )}

                <h1 className="heading">Sản <span>Phẩm</span></h1>
                {products.length === 0 ?
                    <p style={{textAlign: "center", color: "red", fontSize: "25px"}}>Không tìm thấy sản phẩm</p> :

                    <div className="box-container" style={{marginTop: "-20px"}}>

                        {

                            currentContracts.map((p) => (
                                <div className="box">
                                    <div className="image">
                                        <NavLink to={"/detail/" + p.id}>
                                            <img
                                                src={p.image}
                                                alt=""/>
                                            {
                                                p.quantity > 0 ? "" :
                                                    <span className="sold">Hết hàng</span>
                                            }
                                        </NavLink>
                                    </div>
                                    <div className="content">
                                        <h3>{p.name}</h3>
                                        <div className="price">{p.price.toLocaleString()} VND</div>
                                        {
                                            role === 'ROLE_ADMIN' ? "" :
                                                <div>
                                                    <i className="fas fa-shopping-cart"
                                                       onClick={() => addToCart(quantity, p.id)}></i>
                                                    <i className="fas fa-heart"></i>
                                                    <i className="fas fa-eye"></i>
                                                </div>
                                        }


                                    </div>
                                    <div>
                                        {
                                            role !== 'ROLE_ADMIN' ? "" :
                                                <button type="button" id='btn-xoa' data-bs-toggle="modal"
                                                        className='btn btn-outline-danger'
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => deleteByName(p.id, p.name)}>Xóa</button>
                                        }
                                        {
                                            role !== 'ROLE_ADMIN' ? "" :
                                                <button className='btn btn-outline-primary' id="update"><Link
                                                    to={"/updateProduct/" + p.id}>Sửa</Link></button>
                                        }


                                    </div>
                                </div>
                            ))}
                    </div>

                }
                {
                    !shouldHidePagination && <div className="pagination-container">
                        {currentPage !== 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)}
                                    style={{border: "1px solid #ccc", background: "#e8e2e2", color: "black"}}>
                                Trước
                            </button>
                        )}
                        {Array.from({length: totalPages}, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                style={{
                                    fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                                    border: "1px solid #ccc",
                                    background: "#e8e2e2",
                                    color: "black"
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage !== totalPages && (
                            <button onClick={() => handlePageChange(currentPage + 1)}
                                    style={{border: "1px solid #ccc", background: "#e8e2e2", color: "black"}}>
                                Sau
                            </button>
                        )}
                    </div>
                }


            </section>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận xóa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h3>Bạn có muốn xóa <span style={{color: "red"}}>{nameDelete}</span></h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="submit" className="btn btn-danger" onClick={() => deleteProduct(idDelete)}
                                    data-bs-dismiss="modal">Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}