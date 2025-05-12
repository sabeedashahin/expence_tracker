import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const InviteFriends = () => {
  const [inviteEmail, setInviteEmail] = useState("");
  const token = useSelector((state) => state.token);

  const handleInvitefriends = async () => {
    try {
      console.log("invite token:", token);
      const api = await axios.post(
        "http://localhost:3006/api/invite/send-mail",
        { email: inviteEmail },
        { headers: { Authorization: `${token}` } }
      );
      console.log("invite friends:", api);
      alert(api.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 w-full">
      <h4 className="text-amber-950 font-semibold text-lg">Invite friends</h4>

      <input
        className="bg-[#e4eeee] p-3 rounded-xl w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-black focus:outline-none focus:ring-2 focus:ring-amber-500"
        placeholder="Enter your friend's email"
        type="email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
      />

      <button
        className="bg-amber-600 px-6 py-3 rounded-xl text-white hover:bg-amber-800 transition-all duration-200 w-full sm:w-auto"
        onClick={handleInvitefriends}
      >
        Invite
      </button>
    </div>
  );
};

export default InviteFriends;
