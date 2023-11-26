import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
const EditContractForm = (props) => {
  const [formData, setFormData] = useState({
    // dont delete this comment
    // user_id here is the current logged in user id
    //while the provider id here is other user id, in this case the the user
    //that will be receiving the contract.
    //conclusion the mix up here is not by mistake
    user_id: props.providerId,
    provider_id: props.userId,
    conversation_id: props.conversationId,
    contract_details: "",
    contract_amount: "",
    contract_title: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `
    ${BACKEND_URL}/contracts/${props.contractId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const contractData = response.data.contract[0];

        setFormData({
          contract_title: contractData.title,
          contract_status: "PENDING",
          contract_details: contractData.contract_details,
          contract_amount: contractData.contract_amount,
        });
        console.log(contractData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.contractId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${BACKEND_URL}/contracts/${props.contractId}/edit`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Contract updated successfully!");
      console.log(response);
      handleClick();
    } catch (error) {
      console.error(error);
      toast.error("Error creating contract!");
      handleClick();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    props.closePopup();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form
        className="max-w-md w-full p-8 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">{props.contractTitle}</h2>
        <div className="mb-4">
          <input
            type="hidden"
            id="user_id"
            name="user_id"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <input
            type="hidden"
            id="cotractId"
            name="cotractId"
            value={props.contractId}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            type="hidden"
            id=" contract_status"
            name=" contract_status"
            value="PENDING"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="hidden"
            id="provider_id"
            name="provider_id"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            type="hidden"
            id="conversation_id"
            name="conversation_id"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contract_details" className="block font-medium mb-2">
            Title
          </label>
          <input
            id="contract_title"
            name="contract_title"
            defaultValue={formData.contract_title}
            required
            rows="1"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contract_details" className="block font-medium mb-2">
            Contract Details
          </label>
          <textarea
            id="contract_details"
            name="contract_details"
            defaultValue={formData.contract_details}
            required
            rows="3"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="contract_amount" className="block font-medium mb-2">
            Contract Amount
          </label>
          <input
            type="text"
            id="contract_amount"
            name="contract_amount"
            defaultValue={formData.contract_amount}
            required
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-between">
          <button
            type="button"
            onClick={handleClick}
            className="w-40 bg-gray-500 mr-4 text-white py-2 px-4 rounded  focus:outline-none focus:bg-indigo-400"
          >
            Close
          </button>
          <button
            type="submit"
            className="w-40 bg-primary text-white py-2 px-4 rounded hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400"
          >
            Update Contract
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContractForm;
