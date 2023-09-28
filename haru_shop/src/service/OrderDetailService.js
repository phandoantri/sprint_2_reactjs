import axios from "axios";

export const getAllOrderDetail=async (id)=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get(`http://localhost:8080/api/orderDetail/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
            )
        return result.data
    }catch (e) {
        console.log(e)
    }
}