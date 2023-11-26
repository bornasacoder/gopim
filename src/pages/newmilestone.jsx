import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EscrowMilestonesForm = () => {
  const [project_id, setProjectId] = useState("");
  const [user_id, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/escrow_milestones", {
        project_id,
        user_id,
        amount,
        description,
      });
      if (response.status === 200) {
        toast.success("Escrow milestone created successfully");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-sm w-full">
        <div className="mb-4">
          <label
            htmlFor="project_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Project ID
          </label>
          <input
            type="text"
            id="project_id"
            value={project_id}
            onChange={(e) => setProjectId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="user_id"
            className="block text-gray-700 font-bold mb-2"
          >
            User ID
          </label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Escrow Milestone
        </button>
      </form>
    </div>
  );
};

export default EscrowMilestonesForm;
