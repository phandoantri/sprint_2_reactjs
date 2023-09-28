import axios from "axios";
import {GET_ALL_CART} from "./type";
const token = localStorage.getItem("token")



export const getAllCart1 = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8080/api/listCart",
            {
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": "Bearer " + token
                }
            })
        dispatch({
            type: GET_ALL_CART,
            payload: res.data.length
        })
    } catch (e) {
        console.log(e)
    }
}