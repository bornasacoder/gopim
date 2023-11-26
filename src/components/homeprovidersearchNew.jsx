import { useState, useEffect, use } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import Countries from "@/commons/countries";

import { useDispatch } from "react-redux";
import NewContract from "@/pages/newcontract";
import Login from "@/auth/login";
import Register from "@/auth/register";

const TypewriterSearchBox = (props) => {
  const searchQueries = [
    "get freelancer job now.",
    "build an ecommerce website for me.",
    "integrate stripe in my react project.",
  ];
  const [displayText, setDisplayText] = useState("");
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const currentQuery = searchQueries[currentQueryIndex];
  let interval;
  useEffect(() => {
    let currentIndex = 0;

    const updateSearchBox = () => {
      if (currentIndex === currentQuery.length) {
        // If the current line is completed, clear the search box
        clearInterval(interval);
        setTimeout(() => {
          setDisplayText("");
          currentIndex = 0;
          setCurrentQueryIndex(
            (prevIndex) => (prevIndex + 1) % searchQueries.length
          ); // Move to the next line
          interval = setInterval(updateSearchBox, 100); // Start typing the next line
        }, 1000); // Wait for 1 second before starting the next line
      } else {
        // Get the characters from the current line and join them into a string
        setDisplayText(currentQuery.slice(0, currentIndex + 1));
        currentIndex++; // Move to the next character for the next iteration
      }
    };

    // Start the typewriter effect when the component mounts
    interval = setInterval(updateSearchBox, 100); // 100 milliseconds in this example

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentQuery]);

  useEffect(() => {
    // Stop the typewriter effect after 60 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 60000); // 60,000 milliseconds = 60 seconds

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(timeout); // Clear the timeout to avoid memory leaks
    };
  }, []);
  return (
    <input
      placeholder={displayText ? displayText : "Search..."}
      class="search-box rounded-full w-full h-[4.5rem] bg-transparent py-0 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-cool-indigo-200 focus:border-cool-indigo-200"
      type="text"
      value={props.projectDescription}
      onChange={props.handleTextareaChange}
      readOnly={props.resultIsAvailable ? true : false}
      required={true}
    />
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
  const [contractPopup, setContractPopup] = useState(false);
  const [providerId, setProviderId] = useState(0);

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
    // const textarea = document.getElementById("myTextarea");
    // textarea.style.height = "auto"; // Reset the height to auto
    // textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the content's scroll height
  };
  const handleTextareaChange = (event) => {
    setProjectDescription(event.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/find_recommended_providers`,
        {
          project_description: projectDescription,
          budget: budget,
        }
      );
      setProviders(response.data.recommended_providers);
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
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = (provider_id) => {
    setProviderId(provider_id);
    setContractPopup(true);
  };
  const handleChildClick = (e) => {
    e.stopPropagation();
    console.log("child");
  };

  return (
    <div class="relative pb-4">
      <main class="px-4 mx-auto mt-10 max-w-7xl sm:mt-14">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 font-display sm:text-5xl md:text-6xl xl:text-7xl">
            <span class="block xl:inline text-white">
              Find the right freelancer using AI
            </span>
            <span class="block text-cool-indigo-600"></span>
          </h1>
          <p class="max-w-md mx-auto mt-3 text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Lorem ipsum dolor sit amet amet, consectetur adipiscing elit. Sed
            pellentesque, libero id aliquet eleifend, mi felis aliquam lacus, ac
            luctus odio mauris ut nunc. Nullam ex nisl.
          </p>
          <div className="container mx-auto px-4">
            <ToastContainer />
            {!resultIsAvailable && <></>}

            <div class="relative max-w-3xl px-4 mx-auto mt-10 sm:px-6">
              <form onSubmit={handleSubmit}>
                <div class="relative w-full max-w-xl mx-auto bg-white rounded-full h-[4.5rem] lg:max-w-none">
                  <TypewriterSearchBox
                    resultIsAvailable={resultIsAvailable}
                    projectDescription={projectDescription}
                    handleTextareaChange={handleTextareaChange}
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

                  {!resultIsAvailable && (
                    <button
                      type="submit"
                      class="absolute inline-flex items-center h-12 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-[#2448c6] sm:px-6 sm:text-base sm:font-medium hover:bg-[#2448c6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:[#42b5d3]"
                    >
                      <svg
                        class="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      Search
                    </button>
                  )}
                  {resultIsAvailable && (
                    <button
                      type="button"
                      class="absolute inline-flex items-center h-12 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-[#2448c6] sm:px-6 sm:text-base sm:font-medium hover:bg-[#2448c6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:[#42b5d3]"
                      onClick={() => toggleResultIsAvailable()}
                    >
                      <svg
                        class="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

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
                              src={provider.metadata.profile_picture}
                              alt={provider.metadata.name}
                            />
                          </div>
                          <div className="ml-3 py-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {provider.metadata.name}
                              <Link
                                href={`${BACKEND_URL}/u/${provider.metadata.username}`}
                                className="mx-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                @{provider.metadata.username}
                              </Link>
                              {/* <span className="text-gray-500 text-sm ml-2">
                                ({provider.rating})
                              </span> */}
                              <span className="text-gray-500 text-sm ml-2">
                                {provider.metadata.hourly_rate} USD / hour
                              </span>
                              {provider.metadata.country != "" ? (
                                <span
                                  role="img"
                                  aria-label="Country Flag"
                                  className="ml-2"
                                >
                                  <ReactCountryFlag
                                    countryCode={getCountryValue(
                                      provider.metadata.country
                                    )}
                                    svg
                                  />
                                </span>
                              ) : (
                                <span
                                  role="img"
                                  aria-label="Country Flag"
                                  className="ml-2"
                                >
                                  <ReactCountryFlag
                                    countryCode={getCountryValue("Sweden")}
                                    svg
                                  />
                                </span>
                              )}
                              <span className="text-sm ml-2 py-1">
                                {/*provider.city */}
                              </span>
                            </h3>
                            <p className="text-gray-500">
                              {provider.sales_pitch}
                            </p>
                            {/*  <p className="text-black py-1">
                              {provider.keywords}
                            </p> */}
                            {/*       <div className="flex flex-col sm:flex-row items-center py-1">
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
                            </div> */}
                          </div>

                          <div className="ml-3">
                            {" "}
                            <div className="mt-2 flex justify-between sm:flex-col">
                              <button
                                type="button"
                                onClick={() => {
                                  handleChatButtonClick(provider.id);
                                }}
                                className="bg-[#2448c6] hover:bg-[#4865cc] text-white font-bold py-1 px-1  m-1 rounded-md w-24 "
                              >
                                Message
                              </button>

                              <button
                                onClick={() => {
                                  openPopup(provider.id);
                                }}
                                className="bg-[#038428] hover:bg-[#2b9f4ce1] text-white font-bold py-1 px-1  m-1 rounded-md w-24"
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
                <div
                  className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 rounded-lg"
                  onClick={handleCloseModal}
                >
                  <section
                    className="h-[500px] max-h-[500px] w-[900px] relative bg-white rounded-lg"
                    onClick={handleChildClick}
                  >
                    <div className="flex justify-end absolute right-0 top-0">
                      <button
                        className="bg-transparent border-none p-0 mt-3 me-3"
                        onClick={handleCloseModal}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="h-full">
                      {/* <!-- Left column container with background--> */}
                      <div className="g-0 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div className="w-6/12 xl:w-6/12 hidden md:block">
                          <img
                            src="/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                          />
                        </div>

                        {/* <!-- Right column container --> */}
                        <div className="mb-12 md:mb-0 md:w-6/12 lg:w-6/12 xl:w-6/12">
                          {registerView ? (
                            <Login
                              setIsLoggedIn={setIsLoggedIn}
                              gotoRegisterView={handleRegisterViewChange}
                              handleCloseModal={handleCloseModal}
                            />
                          ) : (
                            <Register
                              gotoLoginView={handleRegisterViewChange}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
        <NewContract
          recipientUser={providerId}
          closePopup={closePopup}
          openPopup={openPopup}
          contractPopup={contractPopup}
        />
      </main>
    </div>
  );
}

export default HomepageProviderSearch;
