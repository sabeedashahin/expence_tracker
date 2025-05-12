import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";

const CreateGroupComponent = () => {
  const [groupname, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const token = useSelector((state) => state.token);
  const { groupId } = useParams();

  const usenavigate = useNavigate();

  const displayUsers = async () => {
    console.log("token in create group:", token);
    try {
      const api = await axios.get("http://localhost:3006/api/fetchusers", {
        headers: { Authorization: `${token}` },
      });
      console.log("fetch users:", api);
      setUsers(api.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  async function createGroupModal() {
    try {
      setModalOpen(true);
    } catch (error) {
      console.log("error in group creating modal:", error);
    }
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setGroupName("");
    setMembers([]);
    setModalMessage("");
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    // console.log("in created group:", token);
    try {
      const api = await axios.post(
        "http://localhost:3006/api/group/creategroup",
        {
          name: groupname,
          selectedMembers,
        },
        { headers: { Authorization: `${token}` } }
      );
      console.log(api);
      setModalMessage(api.data.message);
      setModalOpen(true);
      setGroupName("");
      setMembers([]);
      // alert(api.data.message);
      await fetchGroup();
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
      setModalMessage(error.response.data.message);
    }
  };

  const handleUserSelection = (id) => {
    setSelectedMembers((prevMembers) => {
      if (prevMembers.includes(id)) {
        return prevMembers.filter((member) => member !== id);
      } else {
        return [...prevMembers, id];
      }
    });
  };

  const fetchGroup = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/api/group/fetchgroup",
        { headers: { Authorization: `${token}` } }
      );
      console.log("fetch group res:", response);
      setGroups(response.data.group);
    } catch (error) {
      console.log(error);
    }
  };

  const gotoGroup = async (groupId) => {
    try {
      usenavigate(`/group/${groupId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayUsers();
    fetchGroup();
  }, [groupId, token]);

  return (
    <div className="min-h-screen w-full bg-amber-50 flex flex-col lg:flex-row items-center justify-center p-4 gap-10">
      {/* Left Text Section */}
      <div className=" sm:w-[80%] md:w-[70%]  xl:w-[50%] p-10  ">
        <div className="text-xl w-full max-w-md lg:max-w-lg text-amber-950 ">
          <p>
            Groups are perfect for apartments, trips and other situations where
            the set of people share a lot of expenses.
          </p>
          <p className="mt-4">
            If you have travelled recently and worried about expenses split,
            create a group and start splitting!
          </p>
        </div>
        <div>
          <button
            onClick={createGroupModal}
            className="mt-6 px-7 py-3 bg-amber-600 text-white font-bold rounded hover:bg-amber-800"
          >
            + Create Group
          </button>
        </div>
      </div>
      <Dialog.Root
        open={modalOpen}
        onOpenChange={(open) => !open && handleModalClose()}
      >
        <Dialog.Overlay className="fixed inset-0 bg-opacity-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  bg-white p-6 rounded-lg shadow-lg w-96 
  max-h-[90vh] overflow-y-auto"
        >
          {" "}
          <button
            onClick={handleModalClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <Dialog.Title className="text-xl font-semibold text-gray-800">
            Create a New Group
          </Dialog.Title>
          <form onSubmit={handleCreateGroup} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Group Name
              </label>
              <input
                type="text"
                value={groupname}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group name"
                required
              />
            </div>
            <h2 className="block text-center">Members</h2>
            <div className="space-y-4">
              {/* Members List */}
              <div className="flex-row">
                <ul>
                  {users.map((displayUsers) => (
                    <>
                      <div
                        key={displayUsers._id}
                        className="flex items-center justify-between "
                      >
                        <div className="mt-4">
                          <li>{displayUsers.email}</li>
                        </div>
                        <div className="mt-4" key={displayUsers._id}>
                          <button
                            type="button"
                            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                            onClick={() =>
                              handleUserSelection(displayUsers._id)
                            }
                          >
                            {selectedMembers.includes(displayUsers._id)
                              ? "Remove"
                              : "Add"}
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 mt-3 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-950 text-white px-4 py-2 mt-3 rounded hover:bg-amber-800"
              >
                Create
              </button>
            </div>
          </form>
          {modalMessage && (
            <p
              className={`mt-3 text-sm ${
                modalMessage.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {modalMessage}
            </p>
          )}
        </Dialog.Content>
      </Dialog.Root>

      {/* groupList section */}
      <div className="bg-white rounded   sm:w-[80%] md:w-[70%] xl:w-[30%] p-10 mt-16 md:mt-5 lg:mt-5 shadow-md border  border-amber-200">
        <div>
          <h1 className="text-2xl text-center  font-semibold text-amber-900 mb-4">
            Visit your Groups...
          </h1>
          {groups.length <= 0 && (
            <p>
              You are not part of any group Currently, Create a group and start
              splitting!
            </p>
          )}
        </div>

        <div className=" grid grid-cols-1 space-y-2 place-items-center ">
          {groups.map((group) => (
            <button
              key={group._id}
              onClick={() => gotoGroup(group._id)}
              className="block text-center w-1/3 py-2 bg-amber-600 text-white font-bold rounded hover:bg-amber-700 "
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateGroupComponent;
