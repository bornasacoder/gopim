import { useState, useEffect } from "react";
import axios from "axios";

import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactCountryFlag from "react-country-flag";
import StarIcon from "@heroicons/react/20/solid";
import Countries from "@/commons/countries";
import AutoExpandTextarea from "./autotextarea";
/* const CometChat = dynamic(() => import("@cometchat-pro/chat"), {
  ssr: false, // Disable server-side rendering for CometChat import
});
 */

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { setAuthUser } from "@/store/slices/authSlice";
import { setAuthState } from "@/store/slices/authSlice";
import { setReceiverId } from "@/store/slices/authSlice";
const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });
      const userId = await response.data.userId;
      const token = await response.data.token;
      const freelancer = await response.data.freelancer;
      const employer = await response.data.employer;
      const mincom = await response.data.mincom;
      const token2 = await response.data.token2;
      Cookies.set("userId", userId);
      dispatch(setAuthState(true));
      dispatch(setAuthUser(userId));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("freelancer", freelancer);
      localStorage.setItem("employer", employer);
      localStorage.setItem("mincom", mincom);
      localStorage.setItem("token2", token2);
      props.setIsLoggedIn(true);

      props.handleCloseModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          type="button"
          onClick={() => {
            props.gotoRegisterView();
          }}
        >
          <span className="text-blue-300">Not registered?</span>Register
        </button>
      </form>
    </div>
  );
};

const Register = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    is_provider: false,
    is_user: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const checkBoxName = e.target.name;
    const value = e.target.checked;
    let is_user = formData.is_user;
    let is_provider = formData.is_provider;

    if (checkBoxName === "is_provider") {
      is_user = false;
      is_provider = true;
    } else if (checkBoxName === "is_user") {
      is_provider = false;
      is_user = true;
    }

    setFormData({
      ...formData,
      is_provider: is_provider,
      is_user: is_user,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/register`, formData);
      toast.success(res.data.message);
      props.setLoginView(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center ">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="w-full  p-6 bg-white rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="is_provider"
              className="block text-gray-700 font-bold mb-2"
            >
              Register as a freelancer?
            </label>
            <input
              type="checkbox"
              name="is_provider"
              checked={formData.is_provider}
              onChange={handleCheckboxChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">I am a freelancer</span>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
              <input
                type="checkbox"
                name="is_user"
                checked={formData.is_user}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">I want to hire a freelancer</span>
            </label>
          </div>
          <div>
            {" "}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8"
            >
              Register
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              props.gotoLoginView();
            }}
          >
            <span className="text-blue-400">Already registed?</span>Login
          </button>
        </form>
      </div>
    </>
  );
};

function HomepageProviderSearch() {
  const [projectDescription, setProjectDescription] = useState("");
  const [budget, setBudget] = useState(50);
  const [providers, setProviders] = useState([]);
  const [resultIsAvailable, setResultIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recipientUser, setRecipientUser] = useState("");
  const [registerView, setRegisterView] = useState(true);
  const [loginView, setLoginView] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    window.CometChat = require("@cometchat-pro/chat").CometChat;
  }, []);

  const sendFirstMessage = (receiver_id) => {
    //emit conversation id and current-loggen user in and the other user id
    //then run a check before joining the conversation room

    const data = {
      sender_id: userId,
      receiver_id: receiver_id,

      text: messageText,
      type: "normal",
    };
    console.log("authUserId", userId);

    fetch(`${BACKEND_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data.error) {
          toast.error(data.error);
        } else {
          router.push(`/chatcontainer`);
        }
      })
      .catch((error) => {
        toast.error(error.response.error);
      });
  };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("myTextarea");
    textarea.style.height = "auto"; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the content's scroll height
  };
  const handleTextareaChange = (event) => {
    setProjectDescription(event.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/providers`, {
        project_description: projectDescription,
        budget: budget,
      });
      setProviders(response.data.topproviders);
      toast.success("Done!");
      setResultIsAvailable(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChatClick = (providerId) => {
    router.push(`/messages?providerId=${providerId}`);
  };
  const toggleResultIsAvailable = () => {
    setResultIsAvailable(false);
  };
  function getCountryValue(countryText) {
    const country = Countries.find((c) => c.text === countryText);
    return country ? country.value : "";
  }
  const handleChatButtonClick = (receiver_id) => {
    if (isLoggedIn) {
      let receiverID = receiver_id;

      let receiverType = CometChat.RECEIVER_TYPE.USER;
      let messageText = "Hi, I want to hire you for me project";

      const message = new CometChat.TextMessage(
        receiver_id,
        messageText,
        receiverType
      );
      // Code to handle the action when the user is logged in
      CometChat.sendMessage(message).then(
        (message) => {
          router.push("/message");
        },
        (error) => {
          // Handle message sending error
          console.log("error sending msg", error);
        }
      );
      //dispatch(setReceiverId(receiver_id));
      //window.CometChatWidget.chatWithUser(receiver_id);
    } else {
      setShowModal(true);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleRegisterViewChange = () => {
    setRegisterView(!registerView);
  };
  return (
    <div className=" flex flex-col p-4 mt-10 ">
      <div className="text-center py-8">
        <h1 className="text-bold text-xl mb-12 tracking-tight text-gray-900 sm:text-2xl">
          <span className="text-gray-200">
            Find the right freelancer using AI
          </span>
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <ToastContainer />
        {!resultIsAvailable && <></>}
        <form onSubmit={handleSubmit}>
          <div
            className="flex flex-col justify-center align-middle flex-wrap -mx-3 mb-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-full flex flex-col sm:flex-row  justify-center">
              <div className="w-full  flex flex-col sm:flex-row  align-middle sm:w-2/3 md:w-2/3 px-3 mb-6 md:mb-0">
                <textarea
                  id="myTextarea"
                  name="project_description"
                  rows={1}
                  className="border bg-white rounded-xl py-3 px-4 w-full h-content mb-2"
                  placeholder="Project description"
                  value={projectDescription}
                  onChange={handleTextareaChange}
                  readOnly={resultIsAvailable ? true : false}
                  required={true}
                  style={{ resize: "none", overflow: "hidden" }}
                />
                <input
                  className=" h-12 appearance-none block rounded-2xl bg-gray-200 text-gray-700 border border-gray-200 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="budget"
                  type="hidden"
                  placeholder="Enter budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  readOnly={resultIsAvailable ? true : false}
                  required={true}
                />
              </div>

              {!resultIsAvailable && (
                <button
                  className="rounded-3xl h-10 bg-[#42b5d3] px-3.5 py-2.5 hover:bg-[#42b5d3] text-white font-bold"
                  type="submit"
                >
                  Search
                </button>
              )}
              {resultIsAvailable && (
                <button
                  className="rounded-2xl h-10 bg-[#42b5d3]  hover:bg-[#42b5d3] text-white font-bold py-2 px-4"
                  onClick={() => toggleResultIsAvailable()}
                  type="button"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="mt-8">
          {loading && (
            <div class="text-center">
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
          )}

          {resultIsAvailable && providers.length > 0 ? (
            <>
              <div className="bg-white rounded">
                <ul className="divide-y divide-gray-200">
                  {providers.map((provider) => (
                    <li
                      key={provider.id}
                      className="p-4 flex flex-col sm:flex-row items-center hover:bg-blue-100"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 bg-blue-100 rounded-full"
                          src={provider.profile_img_url}
                          alt={provider.name}
                        />
                      </div>
                      <div className="ml-3 py-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {provider.name}
                          <Link
                            href={`${provider.profile_url}`}
                            className="mx-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @{provider.username}
                          </Link>
                          <span className="text-gray-500 text-sm ml-2">
                            ({provider.rating})
                          </span>
                          <span className="text-gray-500 text-sm ml-2">
                            {provider.hourly_rate} USD / hour
                          </span>
                          {provider.country != "" ? (
                            <span
                              role="img"
                              aria-label="Country Flag"
                              className="ml-2"
                            >
                              <ReactCountryFlag
                                countryCode={getCountryValue(provider.country)}
                                svg
                              />
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="text-sm ml-2 py-1">
                            {provider.city}
                          </span>
                        </h3>
                        <p className="text-gray-500">{provider.reason}</p>
                        <p className="text-black py-1">{provider.keywords}</p>
                        <div className="flex flex-col sm:flex-row items-center py-1">
                          {provider.companies_worked_with.length > 0 ? (
                            <span className="mx-1">Worked with:</span>
                          ) : (
                            ""
                          )}
                          {provider.companies_worked_with?.map(
                            (company) =>
                              company.logo_url && (
                                <div className="flex bg-gray-100 py-1 px-8">
                                  <Image
                                    key={company.id}
                                    width={20}
                                    height={20}
                                    src={company.logo_url}
                                    className="m-h-4 m-w-4 mx-2"
                                  />
                                  <span className="ml-2 m-h-4 m-w-4">
                                    {company.name}
                                  </span>
                                </div>
                              )
                          )}
                        </div>
                      </div>

                      <div className="ml-3">
                        {" "}
                        <div className="mt-2 flex justify-between sm:flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              handleChatButtonClick(provider.chatkey);
                            }}
                            className="bg-primary hover:bg-primary text-white font-bold py-1 px-1  m-1 rounded-md w-24 "
                          >
                            Message
                          </button>

                          <button
                            onClick={() => {
                              sendFirstMessage(provider.id);
                            }}
                            className="bg-secondary hover:bg-primary text-white font-bold py-1 px-1  m-1 rounded-md w-24"
                          >
                            Hire me
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            ""
          )}

          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center mt-12">
              <div className="bg-white rounded-lg p-2 mx-4 sm:mx-auto w-full sm:w-96  overflow-y-auto max-h-screen mt-16 mb-16">
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="bg-primary mt-16 px-2 py-1 text-white rounded-md hover:text-gray-700 "
                  >
                    X
                  </button>
                </div>

                {registerView ? (
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    gotoRegisterView={handleRegisterViewChange}
                    handleCloseModal={handleCloseModal}
                  />
                ) : (
                  <Register gotoLoginView={handleRegisterViewChange} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomepageProviderSearch;
