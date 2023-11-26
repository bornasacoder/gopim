import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../pages/_app";
import useLocalStorage from "use-local-storage";
import { BACKEND_URL } from "@/utils";
import { useSelector } from "react-redux";
import { selectAuthState } from "../store/slices/authSlice";

const FRONTEND_URL = "http://localhost:3000";
const EditPopup = ({ item, onSave, onCancel }) => {
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
        <h2 className="text-lg font-bold mb-4">Update project details</h2>
        <form>
          <input type="hidden" name="id" value={editedItem.id} />

          <label className="mb-2 block">
            <span className="text-gray-700">Project title</span>
            <input
              type="text"
              name="project_title"
              defaultValue={item.title}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
            ></input>
          </label>
          <label className="mb-2 block">
            <span className="text-gray-700">Project description</span>
            <textarea
              type="text"
              name="project_description"
              defaultValue={item.description}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Close
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

const ProjectsTable = () => {
  const router = useRouter();
  //const { isAuthenticated, user } = useContext(AuthContext);
  const authStatus = useSelector(selectAuthState);

  const [projects, setProjects] = useState([]);
  if (!authStatus) {
    router.push("/login");
  }
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = () => {
      setLoading(true);
      axios
        .get(`${BACKEND_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          // Handle the error here
          console.error(error);
        });
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditPopup(true);
  };

  const handleSave = (editedItem) => {
    axios
      .put(`${BACKEND_URL}/project/${editedItem.id}`, editedItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        // Refresh the withdrawals list after successful save
        axios
          .get(`${BACKEND_URL}/projects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setProjects(response.data);
            setLoading(false);
          })
          .catch((error) => {
            // Handle the error here
            console.error(error);
          });
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      })
      .finally(() => {
        setShowEditPopup(false);
      });
  };
  const handleCancel = () => {
    setShowEditPopup(false);
  };

  const DateTimeDisplay = (datestring) => {
    const dateObj = new Date(datestring);
    const time = dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = dateObj.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });

    return <div>{`${time} ${date}`}</div>;
  };

  return (
    <>
      {loading ? (
        <div class="text-center mt-20 mb-10 pb-10">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
      ) : (
        <div className="hidden lg:block container mx-auto mt-12">
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  {projects.length === 0 ? (
                    <div className=" ">
                      <div className="w-content flex justify-center items-center m-8 bg-gray-100">
                        <img src="/empty_list.svg" />
                        <p>No project yet</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full bg-white border-collapse divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-primary dark:bg-gray-700">
                        <tr>
                          <th className="p-3 font-bold uppercase text-white border  hidden lg:table-cell">
                            #
                          </th>
                          <th className="p-3 font-bold uppercase text-white border  hidden lg:table-cell">
                            Title
                          </th>
                          <th className="p-3 font-bold uppercase text-white border hidden lg:table-cell">
                            Description
                          </th>
                          <th className="p-3 font-bold uppercase text-white border  hidden lg:table-cell">
                            Created At
                          </th>

                          <th className="p-3 font-bold uppercase text-white border  hidden lg:table-cell">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {projects.map((project, index) => (
                          <tr
                            key={project.id}
                            className={`hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-secondary ${
                              index % 2 == 0 ? "" : "bg-blue-100"
                            }`}
                          >
                            <td className="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">
                              {index + 1}
                            </td>
                            <td className="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">
                              <span className="text-sm"> {project.title} </span>
                            </td>
                            <td className="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">
                              <span className="text-sm">
                                {project.description}{" "}
                              </span>
                            </td>
                            <td className="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell">
                              <span className="text-sm">
                                {DateTimeDisplay(project.created_at)}
                              </span>
                            </td>

                            <td className="p-3 font-semibold border-top border-gray-300 hidden lg:table-cell flex justify-center">
                              <>
                                <Link
                                  href={`/aproject?id=` + project.id}
                                  className="bg-orange-300 hover:bg-orange-400 text-black  px-3 py-2 rounded-md w-24"
                                >
                                  View
                                </Link>
                                {isEmployer && (
                                  <button
                                    onClick={() => handleEdit(project)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md ml-2 w-24"
                                  >
                                    Edit
                                  </button>
                                )}{" "}
                              </>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
      {showEditPopup && (
        <EditPopup
          item={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {projects.length === 0 ? (
        <div className="sm:hidden mt-12 p-4 ">
          <div className="w-content flex flex-col items-center  bg-gray-100">
            <img src="/empty_list.svg" />
            <p>No project yet</p>
          </div>
        </div>
      ) : (
        <div className="sm:hidden  mt-12">
          {projects.map((project, index) => (
            <Fragment key={project.id}>
              <div className="border-t bg-white  border-gray-300 py-3 px-4 flex  justify-center">
                <div>
                  <div className="font-semibold">Project {index + 1}</div>
                  <div className="p-1">
                    <h2 className="font-semibold">Title:</h2>
                    <p>{project.title}</p>
                  </div>
                  <div className=" p-1">
                    <h2 className="font-semibold">Description:</h2>
                    <p>{project.description}</p>
                  </div>
                  <div className="flex p-1">
                    <span className="font-semibold">Created At: </span>
                    <span>{DateTimeDisplay(project.created_at)}</span>
                  </div>

                  <div className="mt-2 flex ">
                    <Link
                      href={`/aproject?id=${project.id}`}
                      className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block w-24 "
                    >
                      View
                    </Link>
                    {isEmployer && (
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 ml-2 rounded-md ml-2 inline-block w-24"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {showEditPopup && (
                    <EditPopup
                      item={selectedItem}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  )}
                </div>
              </div>
              <div className="border-b border-gray-300" />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
