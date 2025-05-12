import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginsuccess } from "../../Redux/Action";
import Loginillustration from "../../../../public/Login-bro.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const api = await axios.post("http://localhost:3006/auth/login", {
        email,
        password,
      });
      console.log(api);

      // console.log(api.data.token)
      dispatch(loginsuccess(api.data.token));
      navigate("/creategroup");
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
      setErrors(error.response.data);
      // alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        className="bg-white rounded-2xl shadow-2xl 
  w-[80%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 
  min-h-[400px] lg:min-h-[500px] 
  flex flex-col lg:flex-row items-center justify-center gap-6"
      >
        {/* Image section */}
        <div className="w-full lg:w-1/2 flex justify-center p-4">
          <img
            src={Loginillustration}
            alt="Login illustration"
            className="w-80 h-auto"
          />
        </div>

        {/* Login form section */}
        <div className="w-full lg:w-1/2 p-4">
          <h3 className="text-2xl text-center mb-4 font-bold text-amber-950">
            Login Page
          </h3>

          <div className="mb-4">
            <input
              className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900 ${
                errors?.emptyEmailError ? "border-2 border-red-600" : "border-0"
              }`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, emptyEmailError: "" }));
              }}
            />
            {errors.emptyEmailError && (
              <p className="text-red-600 text-sm">{errors.emptyEmailError}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900 ${
                errors?.emptyPassError ? "border-2 border-red-600" : "border-0"
              }`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, emptyPassError: "" }));
              }}
            />
            {errors.emptyPassError && (
              <p className="text-red-600 text-sm">{errors.emptyPassError}</p>
            )}
          </div>

          <p className="text-sm mb-4">
            Don't you already have an account?
            <Link to="/register" className="ml-2 text-blue-500">
              Click here
            </Link>
          </p>

          <button
            className="bg-amber-600 p-4 rounded-2xl w-full text-white text-xl font-bold hover:bg-amber-950"
            onClick={loginSubmit}
          >
            Log In
          </button>
          {errors.error && (
            <p className="text-red-600 text-center text-lg mt-6">
              {errors.error}
            </p>
          )}

          {loading && <p className="text-center mt-2 text-green-950">Logging in...</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
