import { legacy_createStore } from "@reduxjs/toolkit";
import authReducer from "./reducer";

const store = legacy_createStore(authReducer);
export default store;
