import React from "react";
// import Expence from "./Pages/Group/Expence";
// import AllExpence from "./Pages/Group/AllExpence";

const GroupActions = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="flex space-x-4 p-4 mt-10 w-full rounded-md items-center justify-center  ">
        <button
          className={`px-4 py-2  rounded ${
            activeTab === "addExpense"
              ? "bg-amber-600 text-white"
              : "bg-amber-900 text-white hover:bg-amber-600"
          }`}
          onClick={() => setActiveTab("addExpense")}
        >
          Add an Expense
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "allExpenses"
              ? "bg-amber-600 text-white"
              : "bg-amber-900 text-white hover:bg-amber-600"
          }`}
          onClick={() => setActiveTab("allExpenses")}
        >
          All Expenses of this Group
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "invite"
              ? "bg-amber-600 text-white"
              : "bg-amber-900 text-white hover:bg-amber-600"
          }`}
          onClick={() => setActiveTab("invite")}
        >
          Invite Friends
        </button>
      </div>
    </>
  );
};

export default GroupActions;
