import axios from "axios";

export const getAllProduct=async ()=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get("http://localhost:8080/api/list",
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
export const getAllTypeProduct=async ()=>{
    const token=localStorage.getItem('token')
    try {
    const result=await axios.get("http://localhost:8080/api/type",

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
export const deleteProduct=async (id)=>{
    const token=localStorage.getItem('token')
    try {
        await axios.delete(`http://localhost:8080/api/delete/${id}`,
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
export const detailProduct= async (id)=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get(`http://localhost:8080/api/detail/${id}`,
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
export const searchProductByTypeProduct=async (id)=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get(`http://localhost:8080/api/search/${id}`,
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
export const searchProductByName=async (name)=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get(`http://localhost:8080/api/searchByName?name=${name}`,

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
export const upTo=async ()=>{
    const token=localStorage.getItem('token')
    try {
        const result=await axios.get("http://localhost:8080/api/upto",
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