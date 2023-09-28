import axios from "axios";

export const payWithVNpay = async (total) =>{
    const res = await axios.post(`http://localhost:8080/api/createPayment?total=${total}`)
    return res.data;
}