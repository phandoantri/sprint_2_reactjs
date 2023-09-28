import {GET_ALL_CART} from "../action/type";
import {UPDATE_CART} from "../action/type";

const initialState =[
]
export const cartReducer = (cart=initialState,action)=>{
    const{type,payload} = action
    switch (type) {
        case GET_ALL_CART:
            return payload
        default :
            return cart
    }
}