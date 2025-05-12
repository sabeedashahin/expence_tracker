

export const loginsuccess = (token) => ({
    type: "loginsuccess",
    payload: token,
  });
  
  export const logout = () => ({
    type: "logout",
    payload: null,
  });
  