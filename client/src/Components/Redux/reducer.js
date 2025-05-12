// import { loginsuccess } from "./Action";

const initiolstate = {
    token: localStorage.getItem("token") || null,
  };
  
  const authReducer = (state = initiolstate, action) => {
    switch (action.type) {
      case "loginsuccess":
        localStorage.setItem("token", action.payload);
        return { ...state, token: action.payload };
        case "logout":
        localStorage.removeItem("token")
        return {...state}
      default:
        return state;
    }
  };
  export default authReducer;
  