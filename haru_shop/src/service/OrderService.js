import axios from "axios";

export const saveOrder=async (totals)=>{
    try {
        const token=localStorage.getItem('token')
     await axios.post(`http://localhost:8080/api/payment/${totals}`,null,
         {
             headers:{
                 Authorization:`Bearer ${token}`,
             }
         }
         )
    }catch (e) {
        console.log(e)
    }
}
export const getAllOrder=async ()=>{
    const token=localStorage.getItem('token')
    console.log(token)
    try {
        const result= await axios.get("http://localhost:8080/api/getAllOrder",
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })

        return result.data
    }catch (e) {
        console.log(e)
    }
}