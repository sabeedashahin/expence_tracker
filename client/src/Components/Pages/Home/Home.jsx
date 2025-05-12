import React from "react";
import ManageMoney from "../../../../public/Manage money-bro.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/register");
  };



  return (
    <div className="min-h-screen w-full gap-6 items-center  justify-center flex flex-col md:flex-row md:gap-0 bg-amber-50 p-6">
      {/* Image Section */}
      <div className="w-full  md:w-full flex justify-center mb-6 md:mb-0 md:mt-2">
        <img
          src={ManageMoney}
          alt="finance management illustration"
          className="w-full max-w-xs md:max-w-sm"
        />
      </div>

      {/* Text Section */}
      <div className="w-1/2 md:w-full flex justify-center  items-center flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-950">
          Manage your expenses
        </h2>
        <div className="mt-5 ">
          <p className="text-gray-700 text-xl text-center ml-6 md:text-xl mb-6 max-w-md">
            Track and control your income and spending with ease.
          </p>
        </div>
        <div>
          <button
            onClick={gotoLogin}
            className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
