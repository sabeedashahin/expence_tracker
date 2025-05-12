import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post("http://localhost:3006/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log("register page error", error);
      setErrorMsg(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <div className="min-w-screen  min-h-screen flex items-center bg-amber-50 justify-center ">
      <div className="p-9 bg-white rounded-2xl shadow-2xl sm:max-w-lg min-h-[350px] min-w-[400px]">
        <h3 className="text-3xl flex justify-center mb-3 font-bold text-amber-950">
          Register
        </h3>
        <div className="p-3">
          <input
            className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900 ${
              errorMsg?.usernameError ? "border-2 border-red-600" : "border-0"
            }`}
            type="text"
            placeholder="usename"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMsg.usernameError && (
            <p className="text-red-600 text-sm">{errorMsg.usernameError}</p>
          )}
        </div>
        <div className="p-3">
          <input
            className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900 ${
              errorMsg?.emailError ? "border-2 border-red-600" : "border-0"
            }`}
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errorMsg.emailError && (
            <p className="text-red-600 text-sm">{errorMsg.emailError}</p>
          )}
        </div>
        <div className="p-3">
          <input
            className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900 ${
              errorMsg?.passError ? "border-2 border-red-600" : "border-0"
            }`}
            type="password"
            placeholder="password"
            value={password}
            minLength={8}
            maxLength={8}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errorMsg.passError && (
            <p className="text-red-600 text-sm">{errorMsg.passError}</p>
          )}
          {errorMsg.passwordChecking && (
            <p className="text-red-600 text-sm">{errorMsg.passwordChecking}</p>
          )}

          <p className="text-sm ml-2 m-4">
            Do you already have an account?
            <Link className="text-sm ml-2 text-blue-500  m-4" to="/login">
              Click here
            </Link>
          </p>
        </div>
        <div className="p-3">
          <button
            className="bg-amber-600 p-4 rounded-2xl w-full text-white text-xl font-bold hover:bg-amber-950  cursor-pointer "
            onClick={registerSubmit}
          >
            submit
          </button>
        </div>
        {errorMsg.error && (
          <p className="text-red-600 text-center text-sm mb-2">
            {errorMsg.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
