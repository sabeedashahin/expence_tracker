import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./Redux/Action";

const Navbar = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <nav className="bg-amber-600 text-white px-6 py-4 shadow-md fixed top-0 w-full  ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Expance tracker</h2>

        <div className="flex space-x-4">
          {token ? (
            <>
              <Link className="hover:underline" to="/creategroup">
                Home
              </Link>
              <button onClick={handlelogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="hover:underline" to="/">
                Home
              </Link>
              <Link className="hover:underline" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
