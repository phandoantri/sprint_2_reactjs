import {rootReducer} from "./reducer";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";

const initialStore = {}
const middleware = [thunk]
const store = createStore(rootReducer, initialStore, applyMiddleware(...middleware))
export default store