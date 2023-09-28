import axios from "axios";

export const add = async (quantity,id) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.post(`http://localhost:8080/api/add?quantity=${quantity}&id=${id}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
        return result.data
    } catch (e) {
        console.log(e)
    }
}
export const getAllCart=async ()=>{
    const token = localStorage.getItem('token')
    try {
        const result=await axios.get("http://localhost:8080/api/listCart",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
        return result.data;

    }catch (e) {
        console.log(e)
    }
}
export const setQuantityShopping = async (setQuantity, id) => {
    const token = localStorage.getItem('token');
    try {
        const res = (await axios.patch(`http://localhost:8080/api/minus/${setQuantity}/${id}`,null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
        return res
    }catch (e) {
        console.log(e)
    }
}
export const setQuantityPlus = async (setQuantity, id) => {
    const token = localStorage.getItem('token');
    try {
        const res = (await axios.patch(`http://localhost:8080/api/plus/${setQuantity}/${id}`,null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
        return res
    }catch (e) {
        console.log(e)
    }
}
export const deleteProductFromCart=async (id)=>{
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:8080/api/deleteProductFromCart/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            )
    }catch (e) {
        console.log("aaaaaa")
    }
}
