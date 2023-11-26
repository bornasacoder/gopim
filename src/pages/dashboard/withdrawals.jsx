import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BACKEND_URL } from "@/utils";

// EditPopup component for editing and saving an item
const EditPopup = ({ item, onSave, onCancel, tab }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>
        <form>
          <input type="hidden" name="id" value={editedItem.id} />

          <label className="mb-2 block">
            <span className="text-gray-700">Update withdrawal status</span>
            <select
              name="status"
              defaultValue={editedItem.status}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              {tab === "pending" && (
                <>
                  <option key={"first"}>Select status</option>
                  <option key={"second"} selected="true" value="PROCESSING">
                    Processing
                  </option>
                </>
              )}
              {tab === "processing" && (
                <>
                  {" "}
                  <option key={"first"}>Select status</option>
                  <option key={"second"} value="COMPLETED" selected="true">
                    Completed
                  </option>
                </>
              )}
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Withdrawals component for displaying a list of withdrawals
const Withdrawals = ({ endpoint, tab }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setWithdrawals(response.data.withdrawals);
      })
      .catch((error) => {
        console.error("Error fetching withdrawals:", error);
      });
    setLoading(false);
  }, [endpoint]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditPopup(true);
  };

  const handleSave = (editedItem) => {
    axios
      .put(`${BACKEND_URL}/admin/withdrawals/${editedItem.id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // Refresh the withdrawals list after successful save
        axios
          .get(`${BACKEND_URL}${endpoint}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setWithdrawals(response.data.withdrawals);
          })
          .catch((error) => {
            console.error("Error fetching withdrawals:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating withdrawal:", error);
      })
      .finally(() => {
        setShowEditPopup(false);
      });
  };
  const handleCancel = () => {
    setShowEditPopup(false);
  };
  return (
    <div>
      <div className=" w-content flex justify-around items-center bg-primary text-white py-1">
        <span>#id </span> <span>amount </span>
        <span>user_id </span>
        <span> status </span>
        {tab !== "completed" && <span>action </span>}
      </div>
      <ul>
        {loading && (
          <div class="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {withdrawals.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center justify-around py-1 mb-2 ${
              index % 2 === 0 ? "" : "bg-gray-100"
            } `}
          >
            <span>{item.id} </span> <span>${item.amount} </span>
            <span>{item.user_id} </span>
            <span> {item.status} </span>
            {tab !== "completed" && (
              <button
                onClick={() => handleEdit(item)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md"
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
      {showEditPopup && (
        <EditPopup
          item={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
          tab={tab}
        />
      )}
    </div>
  );
};

// Main component containing the tab buttons and child components
const WithdrawalComponent = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="p-4 bg-white mr-2">
      <h1 className="text-xl font-bold mb-4">Withdrawals</h1>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("pending")}
          className={`${
            activeTab === "pending"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md flex-1`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("processing")}
          className={`${
            activeTab === "processing"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md flex-1`}
        >
          Processing
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`${
            activeTab === "completed"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md flex-1`}
        >
          Completed
        </button>
      </div>
      {activeTab === "pending" && (
        <Withdrawals endpoint="/admin/withdrawals/pending" tab="pending" />
      )}
      {activeTab === "processing" && (
        <Withdrawals
          endpoint="/admin/withdrawals/processing"
          tab="processing"
        />
      )}
      {activeTab === "completed" && (
        <Withdrawals endpoint="/admin/withdrawals/completed" tab="completed" />
      )}
    </div>
  );
};

export default WithdrawalComponent;
