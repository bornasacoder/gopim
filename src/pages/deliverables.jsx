import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";

const CreateDeliverable = ({ projectId, setDeliverables }) => {
  //const [projectID, setProjectID] = useState("");
  //const [providerID, setProviderID] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateDeliverable = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/deliverables`,
        {
          description: description,
          project_id: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("successfully!");
      setDescription("");
      // Get all deliverables after creating
      const getDeliverablesResponse = await axios.get(
        `${BACKEND_URL}/projects/${projectId}/deliverables`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeliverables(getDeliverablesResponse.data.deliverables);
    } catch (error) {
      console.error("Error creating deliverable:", error);
    }
  };

  return (
    <div className="bg-blue-100">
      <div className="flex justify-center p-2">
        <h2>Create New Deliverable</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center bg-blue-100 p-1 border-grey-500 mb-8 sm:mb-1 py-2">
        <div className="flex flex-col sm:flex-row sm:justify-center">
          <label>
            Description:
            <input
              className="ml-1 mb-2 "
              type="text"
              value={description}
              placeholder="deliverable descr..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button
            onClick={handleCreateDeliverable}
            className="bg-primary px-2 py-1  ml-2 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
const DeliverablesTable = ({ deliverables, projectId, setDeliverables }) => {
  return (
    <div className="w-full m-h-100 ">
      <CreateDeliverable
        projectId={projectId}
        setDeliverables={setDeliverables}
      />
      <div className="flex justify-center">
        <h2 className="py-2">List of deliverables</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-secondary">
          {deliverables.map((deliverable, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-secondary ${
                index % 2 == 0 ? "" : "bg-blue-100"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {index + 1}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {deliverable.description}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliverablesTable;
