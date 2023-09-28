import axios from "axios";

export const getUserDetail=async ()=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get("http://localhost:8080/api/userDetail",
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }
            )
        return result.data;
    }catch (e) {
        console.log(e)
    }
}