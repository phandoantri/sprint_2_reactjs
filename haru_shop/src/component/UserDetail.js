import * as userDetails from "../service/UserDetail"
import React, {useEffect, useState} from "react";
import "../css/userDetail.css"
export function UserDetail() {
    const [userDetail,setUserDetail]=useState({})
    const fetchUserDetail=async() =>{
        const result=await userDetails.getUserDetail();
        setUserDetail(result)
        console.log(result)
    }
    useEffect(()=>{
        fetchUserDetail()
    },[])

return(
    <>
       {/* <h1 style={{marginTop: "150px",textAlign:"center"}}>Thông tin khách hàng</h1>*/}
       {/*<table className="table table-striped" style={{marginTop: "50px", marginBottom: "165px",marginLeft:"36%"}}>*/}
       {/*    <tr>*/}
       {/*        <th width="200px">Tên khách hàng</th>*/}
       {/*        <td>{userDetail.name}</td>*/}
       {/*    </tr>*/}
       {/*    <tr>*/}
       {/*        <th width="200px">Địa chỉ</th>*/}
       {/*        <td>{userDetail.address}</td>*/}
       {/*    </tr>*/}
       {/*    <tr>*/}
       {/*        <th width="200px">Số điện thoại</th>*/}
       {/*        <td>{userDetail.phoneNumber}</td>*/}
       {/*    </tr>*/}
       {/*    <tr>*/}
       {/*        <th width="200px">Email</th>*/}
       {/*        <td>{userDetail.email}</td>*/}
       {/*    </tr>*/}
       {/*</table>*/}
        <div className="page-content page-container" id="page-content" style={{marginTop:"150px",marginBottom:"50px",fontSize:"large"}}>
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card1 user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card1-block text-center text-white">
                                        <div className="m-b-25">
                                            <img style={{width:"50px",height:"50px"}}
                                                src="https://lavenderstudio.com.vn/wp-content/uploads/2019/10/gia-chup-hinh-chan-dung-ca-nhan-tp-hcm-01.jpg"
                                                className="img-radius"
                                                alt="User-Profile-Image"
                                            />
                                        </div>
                                        <h3 className="f-w-600">{userDetail.name}</h3>
                                        <h6>Thành viên: Vàng </h6>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"/>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card1-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                            Thông tin cá nhân
                                        </h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{userDetail.email}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Điện thoại</p>
                                                <h6 className="text-muted f-w-400">{userDetail.phoneNumber}</h6>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">

                                        </h6>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="m-b-10 f-w-600">Địa chỉ</p>
                                                <h6 className="text-muted f-w-400">{userDetail.address}</h6>
                                            </div>
                                            <div className="col-sm-4">
                                                <p className="m-b-10 f-w-600">Năm sinh</p>
                                                <h6 className="text-muted f-w-400">{userDetail.dayOfBirth}</h6>
                                            </div>
                                            <div className="col-sm-4">
                                                <p className="m-b-10 f-w-600">Giới tính</p>
                                                <h6 className="text-muted f-w-400">{userDetail.gender === 0 ? "Nữ" : "Nam"}</h6>
                                            </div>
                                        </div>
                                        <ul className="social-link list-unstyled m-t-40 m-b-10">
                                            <li>
                                                <a
                                                    href="#!"
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title=""
                                                    data-original-title="facebook"
                                                    data-abc="true"
                                                >
                                                    <i
                                                        className="mdi mdi-facebook feather icon-facebook facebook"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#!"
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title=""
                                                    data-original-title="twitter"
                                                    data-abc="true"
                                                >
                                                    <i
                                                        className="mdi mdi-twitter feather icon-twitter twitter"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#!"
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title=""
                                                    data-original-title="instagram"
                                                    data-abc="true"
                                                >
                                                    <i
                                                        className="mdi mdi-instagram feather icon-instagram instagram"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
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