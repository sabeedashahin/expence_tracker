import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNewMember = async () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefbf6] p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          Welcome to the Expense Management!
        </h2>
        {/* <p className="text-gray-700 mb-2">You are a member of this group.</p> */}
        <p className="text-gray-700 mb-6">Join the group to get started.</p>
        <button
          onClick={handleNewMember}
          className="bg-amber-600 hover:bg-amber-800 text-white px-6 py-3 rounded-xl transition-all duration-200"
        >
          Click here!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
