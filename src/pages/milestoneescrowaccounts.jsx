import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { AuthContext } from "../pages/_app";
import { BACKEND_URL } from "@/utils";

const MilestoneEscrowAccountsTable = ({
  milestoneEscrowAccounts,
  openPopup,
}) => {
  const router = useRouter();
  //const { isAuthenticated, user } = useContext(AuthContext);
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [isOpen, setIsOpen] = useState(false);
  const [providerId, setProviderId] = useState("");
  const [userId, setUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  function handleRefreshClick() {
    router.reload();
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const setIds = (providerId, userId, projectId, amount) => {
    setProviderId(providerId);
    setUserId(userId);
    setProjectId(projectId);
    setAmount(amount);
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "providerId") {
      setProviderId(value);
    } else if (name === "userId") {
      setUserId(value);
    } else if (name === "projectId") {
      setProjectId(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/release_milestone`,
        {
          provider_id: providerId,
          user_id: userId,
          project_id: projectId,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      toggleModal();
      handleRefreshClick();
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      toggleModal();
    }
  };
  return (
    <div className="w-full flex justify-center m-h-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary">
          <tr className="w-full">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase w-1/5"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase w-2/5 "
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase w-2/5"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {milestoneEscrowAccounts.map((milestone, index) => (
            <tr
              key={milestone.id}
              className={`hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-secondary ${
                index % 2 == 0 ? "" : "bg-blue-100"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {milestone.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {milestone.amount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {milestone.completed ? (
                    <div className="flex">
                      <p className="inline-block bg-green-100 px-4 py-2">
                        Completed
                      </p>
                      <button
                        className="bg-secondary px-4 py-2 w-24 ml-2 text-white rounded-md"
                        onClick={() => {
                          openPopup();
                        }}
                      >
                        Rate
                      </button>
                    </div>
                  ) : isEmployer ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setIds(
                          milestone.provider_id,
                          milestone.user_id,
                          milestone.project_id,
                          milestone.amount
                        );
                        toggleModal();
                      }}
                    >
                      Release
                    </button>
                  ) : (
                    <p className="inline-block bg-green-100 px-4 py-2">
                      Ongoing
                    </p>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {isOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Release Milestone of ${amount}
                        </h3>
                        <div className="mt-2">
                          <div className="mt-2">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="providerId"
                              name="providerId"
                              type="hidden"
                              value={providerId}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="userId"
                              name="userId"
                              type="hidden"
                              value={userId}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="projectId"
                              name="projectId"
                              type="hidden"
                              value={projectId}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="amount"
                              name="amount"
                              type="hidden"
                              value={amount}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Release
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={() => setIsOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default MilestoneEscrowAccountsTable;
