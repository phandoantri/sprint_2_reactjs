import React, {useEffect, useState} from "react";
import * as orderService from "../service/OrderService"
import moment from "moment";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getAllCart1} from "./redux/action/cart";

export function Order() {
    const [order, setOrder] = useState([]);
    const dispatch=useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    const contractsPerPage = 15;
    const indexOfLastContract = currentPage * contractsPerPage;
    const indexOfFirstContract = indexOfLastContract - contractsPerPage;
    const currentContracts = order.slice(
        indexOfFirstContract,
        indexOfLastContract
    );
    const totalPages = Math.ceil(order.length / contractsPerPage);
    const shouldHidePagination = totalPages <= 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const getAllOrder = async () => {
        const result = await orderService.getAllOrder();
        setOrder(result)
    }
    useEffect(() => {
        getAllOrder()
        dispatch(getAllCart1())

    }, [])
    const token = localStorage.getItem('token')
    console.log(token)
    return (
        <>
            <h1 style={{textAlign:"center",marginTop:"150px"}}>Lịch sử giao dịch</h1>
            <table className='table table-striped ' style={{marginTop: '40px',marginBottom:"20px"}}>
                <thead className='table-dark'>
                <tr>
                    <th>Tên khách hàng</th>
                    <th>Ngày mua hàng</th>
                    <th>Tổng tiền thanh toán</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentContracts.map((o) => (
                        <tr>
                            <td>{o.customer.name}</td>
                            <td>{moment(o.createDate).format('DD/MM/YYYY HH:mm:ss')}</td>
                            <td>{o.totalPayment.toLocaleString()} VND</td>
                            <td>
                                <NavLink to={"/orderDetail/"+o.id}><i className="bi bi-pencil-square"/></NavLink>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {
                !shouldHidePagination && <div className="pagination-container">
                    {currentPage !== 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)} style={{border: "1px solid #ccc",background:"#e8e2e2",color:"black"}} >
                            Trước
                        </button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal',border: "1px solid #ccc",background:"#e8e2e2",color:"black" }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage !== totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)} style={{border: "1px solid #ccc",background:"#e8e2e2",color:"black"}}>
                            Sau
                        </button>
                    )}
                </div>
            }
        </>
    )
}