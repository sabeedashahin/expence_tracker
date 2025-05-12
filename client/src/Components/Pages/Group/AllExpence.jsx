import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AllExpence = () => {
  const token = useSelector((state) => state.token);
  const [allExpences, setAllExpences] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const { groupId } = useParams();

  useEffect(() => {
    const fetchExpences = async () => {
      const response = await axios.get(
        `http://localhost:3006/api/expenses/fetchexpence/${groupId}`,
        { headers: { Authorization: `${token}` } }
      );
      setAllExpences(response.data.expence);
    };

    fetchExpences();
  }, [groupId, token]);

  useEffect(() => {
    const gettotalExpence = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/api/allexpense/total/${groupId}`,
          { headers: { Authorization: `${token}` } }
        );
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching total expense:", error);
      }
    };

    gettotalExpence();
  }, [groupId, token]);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl  font-bold text-amber-950 mb-6">
        All Expenses for this Group
      </h1>

      {/* Table wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-500 lg:w-[500px] w-full items-center justify-center">
          <thead>
            <tr className="bg-amber-900">
              <th className="border text-white border-gray-500 px-4 py-2 text-left">
                Expense
              </th>
              <th className="border text-white border-gray-500 px-4 py-2 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allExpences.map((item, index) => (
              <tr
                key={item._id}
                className={"bg-[#e4eeee] hover:bg-gray-200 transition"}
              >
                <td className="px-4 sm:px-6 py-2 border border-gray-300 text-sm sm:text-base">
                  {item.expenceName}
                </td>
                <td className="px-4 sm:px-6 py-2 border border-gray-300 text-right text-sm sm:text-base">
                  ₹{item.amount}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-700 text-white font-bold">
              <td className="px-4 sm:px-6 py-3 border border-gray-400">
                Total:
              </td>
              <td className="px-4 sm:px-6 py-3 border border-gray-400 text-right">
                ₹{totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExpence;
