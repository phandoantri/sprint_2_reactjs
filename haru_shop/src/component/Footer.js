import "../css/footer.css"
import React from "react";
export function Footer() {
return(
    <>
        <div className="pt-5 pb-5 footer ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-xs-12 about-company">
                        <h2 style={{fontWeight:"bold"}}>Haru Store</h2>
                        <p className="pr-5" style={{color:"#fff"}}>Haru Store tự hòa là nhà phân phối thức ăn dành cho chó mèo hàng đầu Đà Nẵng </p>
                    </div>
                    <div className="col-lg-3 col-xs-12 links">
                        <h2 className="mt-lg-0 mt-sm-3" style={{fontWeight:"bold"}}>Links</h2>
                        <ul className="m-0 p-0">
                            <li>- <a href="#">Haru Store</a></li>
                            <li>- <a href="#">Thức ăn của chó</a></li>
                            <li>- <a href="#">Thức ăn của mèo</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-xs-12 location">
                        <h2 className="mt-lg-0 mt-sm-4" style={{fontWeight:"bold"}}>Địa chỉ</h2>
                        <p>280 Trần Hưng Đạo, Thành phố Đà Nẵng</p>
                        <p className="mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>Harustore@gmail.com</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col copyright">
                        <p className=""><small className="text-white-50">© 2023. All Rights Reserved.</small></p>
                    </div>
                </div>
            </div>
        </div>
        </>
)
}