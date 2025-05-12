import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import GroupActions from "../../GroupActions";

import Expence from "./Expence";
import AllExpence from "./AllExpence";
import InviteFriends from "../Invite/InviteFriends";

const GroupDetails = () => {
  // const { groupId } = useParams();
  const [activeTab, setActiveTab] = useState("addExpense");

  return (
    <div className="min-h-screen bg-amber-50 p-6 " >
      {/* Use GroupActions Component */}
      <GroupActions activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render Content Based on Active Tab */}
      <div className="mt-4">
        {activeTab === "addExpense" && <Expence />}
        {activeTab === "allExpenses" && <AllExpence />}
        {activeTab === "invite" && <InviteFriends />}
      </div>
    </div>
  );
};

export default GroupDetails;
