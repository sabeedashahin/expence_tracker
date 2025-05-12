import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Expence = () => {
  const [expenceName, setExpenceName] = useState("");
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [expenceDetails, setExpenceDetails] = useState([]);
  const [errors, setError] = useState([]);
  const { groupId } = useParams();
  const token = useSelector((state) => state.token);
  // const navigate = useNavigate();

  console.log("recieved group id:", groupId);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3006/api/expenses/fetchgroupmembers/${groupId}`,
          { headers: { Authorization: `${token}` } }
        );

        console.log("fetch members:", response);
        setGroupMembers(response.data.groupmembers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupMembers();
  }, [groupId, token]);

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  //

  const AddExpence = async (e) => {
    e.preventDefault();
    try {
      console.log("received token in expence:", token);
      console.log("selectedMembers:", selectedMembers);
      const api = await axios.post(
        `http://localhost:3006/api/expenses/addexpense/${groupId}`,
        { expenceName, amount, upiId, selectedMembers },
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("add expence:", api);
      setExpenceName("");
      setAmount("");
      setUpiId("");
      setSelectedMembers("");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      console.log("error in add expence:", error.response.data);
    }
  };

  const handlefetchexpenses = async () => {
    try {
      if (!token || !groupId) {
        console.log("missing token or groupId");
      }
      const response = await axios.get(
        `http://localhost:3006/api/expenses/fetchexpence/${groupId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("Received groupId:", groupId);
      console.log("fetched expence:", response);
      setExpenceDetails(response.data.expence);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlefetchexpenses();
  }, [groupId, token]);

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start px-4">
        <div className="w-full lg:w-[500px] p-5 rounded shadow-md border  border-amber-200 bg-white">
          <div>
            <h1 className="text-2xl text-center mt-3 font-bold text-amber-950">
              Your Expenses
            </h1>
          </div>
          <form
            className="p-5 items-center justify-center"
            onSubmit={AddExpence}
          >
            <label>Expense Name</label>
            <input
              className={`bg-[#e4eeee] p-3 rounded-2xl w-full text-white-900  ${
                errors?.expenceError ? " border-red-700" : "border-0"
              } `}
              type="text"
              value={expenceName}
              onChange={(e) => setExpenceName(e.target.value)}
            />
            {errors.expenceError && (
              <p className="text-red-700">{errors.expenceError}</p>
            )}

            <br />
            <label>Amount</label>
            <input
              className={`bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900  ${
                errors.amountError ? " border-red-700" : "border-0"
              } `}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amountError && (
              <p className="text-red-700">{errors.amountError}</p>
            )}
            <br />

            <label>UPI id (optional)</label>
            <input
              className="bg-[#e4eeee] p-4 rounded-2xl w-full text-white-900"
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <br />
            {errors.membersError && (
              <p className="text-red-700">{errors.membersError}</p>
            )}
            <label>Members involved:</label>
            {groupMembers?.createdBy ? (
              <p className="p-1 m-1">
                <input
                  // className=""
                  type="checkbox"
                  value={groupMembers.createdBy._id}
                  checked={selectedMembers.includes(groupMembers.createdBy._id)}
                  onChange={() =>
                    handleCheckboxChange(groupMembers.createdBy._id)
                  }
                />
                {groupMembers.createdBy.email} (you)
              </p>
            ) : (
              <p>Loading creator info...</p>
            )}
            {Array.isArray(groupMembers.members) &&
            groupMembers.members.length > 0 ? (
              groupMembers.members.map((member) => (
                <div key={member._id} className="p-1 m-1">
                  <p>
                    <input
                      type="checkbox"
                      value={member._id}
                      checked={selectedMembers.includes(member._id)}
                      onChange={() => handleCheckboxChange(member._id)}
                    />
                    {member.email}
                  </p>
                </div>
              ))
            ) : (
              <p>No members found</p>
            )}
            <div className="p-3 flex items-center justify-center ">
              <button
                className="bg-amber-800 p-3 rounded-xl w-1/2 text-white text-lg font-semibold  hover:bg-amber-950  cursor-pointer "
                type="submit"
              >
                Add Expence
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:flex-1 overflow-x-auto mt-5 lg:mt-0 bg-white p-3 rounded  shadow-md border  border-amber-200 lg:min-h-full">
          <div>
            <h1 className="text-2xl text-center mt-3 font-bold text-amber-950">
              Expence Detailes
            </h1>
          </div>
          <div>
            {expenceDetails.length > 0 ? (
              <table className="border-collapse mt-9  border border-gray-500 w-full">
                <thead>
                  <tr className="bg-amber-900 rounded-2xl">
                    <th className="border text-white border-gray-500 px-4 py-2">
                      Expence Name
                    </th>
                    <th className="border text-white border-gray-500 px-4 py-2">
                      Amount
                    </th>
                    <th className="border text-white border-gray-500 px-4 py-2">
                      Members
                    </th>
                    <th className="border text-white border-gray-500 px-4 py-2">
                      Split Amount
                      <p className="text-gray-100  opacity-35 ">(per person)</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenceDetails.map((Details) => (
                    <tr className="bg-[#e4eeee]" key={Details._id}>
                      <td className="border font-serif border-gray-500 px-4 py-2">
                        {Details.expenceName}
                      </td>
                      <td className="border font-serif border-gray-500 px-4 py-2">
                        ₹{Details.amount}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {Array.isArray(Details.members) &&
                        Details.members.length > 0 ? (
                          Details.members.map((member) => (
                            <div className="font-serif" key={member._id}>
                              {member.email}
                            </div>
                          ))
                        ) : (
                          <span className="font-serif">No members found</span>
                        )}
                      </td>
                      <td className="border font-serif border-gray-500 px-4 py-2">
                        ₹{Details.splitAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-5">No Expence found ! Start adding... </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expence;
