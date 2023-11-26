import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import UserRooms from "./contractlist";
import GooPimChat from "./goopimchat";
import { io } from "socket.io-client";
import { BACKEND_URL } from "@/utils";
import { useRouter } from "next/router";
import { set } from "react-hook-form";
//const socket = io(`https://goopim.herokuapp.com`);
function ChatContainer() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  const [recipientUser, setRecipientUser] = useState();
  const [conversationId, setConversationId] = useState();
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contractPopup, setContractPopup] = useState(false);
  const [freelancerName, setFreelancerName] = useState("");
  const [freelancerProfileUrl, setFreelancerProfileUrl] = useState("");
  const [employerProfileUrl, setEmployerProfileUrl] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking if there's a token in localStorage
    const token = localStorage.getItem("token");
    if (token === "" || undefined) {
      router.push("/login");
    }
  }, []);
  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };
  function handleChatListItemClick(
    conversationId,
    receiverId,
    userId,
    freelancer_name,
    freelancer_profile_url,
    employer_name,
    employer_profile_url
  ) {
    setConversationId(conversationId);
    setRecipientUser(receiverId);
    setCurrentUser(userId);
    setFreelancerName(freelancer_name);
    setFreelancerProfileUrl(freelancer_profile_url);
    setEmployerName(employer_name);
    setEmployerProfileUrl(employer_profile_url);
    setIsMenuOpen(false);
  }
  useEffect(() => {
    const button = document.querySelector('[id^="accept-"]');
    if (button && isFreelancer) {
      button.style.display = "none";
    }
  }, []);
  return (
    <div className="flex h-fit bg-gray-100 border-t border-t-black mt-12">
      {/*    <div
        className={`flex-shrink-0 w-1/2 bg-white border-r border-r-black border-r ${
          isMenuOpen ? "" : "hidden"
        } sm:block`}
      ></div> */}
      {isFreelancer && (
        <style>
          {`
          [data-testid="accept-button"] {
            display: none;
          }
        `}
        </style>
      )}
      <div className="flex-1">
        <div className="flex justify-center items-center bg-white p-4 border-b">
          <button
            className="block sm:hidden text-white"
            onClick={handleMenuToggle}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="flex items-center">
            <>
              {isFreelancer && (
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={`${employerProfileUrl}`}
                  alt="Profile picture "
                />
              )}
            </>
            <>
              {" "}
              {isEmployer && (
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={`${freelancerProfileUrl}`}
                  alt="Profile picture"
                />
              )}
            </>
            <div className="mr-4 p-1 ">
              <div>
                {isFreelancer && (
                  <p>
                    {" "}
                    Send contract to{" "}
                    <span className="font-bold"> {employerName}</span>
                  </p>
                )}
              </div>
              <div>
                {" "}
                {isEmployer && (
                  <p>
                    {" "}
                    <span className="font-bold">{freelancerName}</span> can now
                    send you a contract.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mr-10">
            {" "}
            {isFreelancer ? (
              <button
                className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setContractPopup(true);
                }}
              >
                Create Contract
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className={`p-4 flex-1 ${
            isMenuOpen ? "blur-sm z-10" : "blur-none z-0"
          }`}
        >
          <GooPimChat
            currentUser={currentUser}
            recipientUser={recipientUser}
            conversationId={conversationId}
            closePopup={closePopup}
            openPopup={openPopup}
            contractPopup={contractPopup}
          />
          <div className="flex justify-center p-2">
            {isEmployer && (
              <h2 className="font-sm  upload-icon p-2 text-white w-full text-center">
                All the contract sent to you by providers will show below
              </h2>
            )}
            <>
              {isFreelancer && (
                <h2 className="font-sm upload-icon p-2 text-white w-full text-center">
                  Click a user below to select
                </h2>
              )}
            </>
          </div>
          <UserRooms handleChatListItemClick={handleChatListItemClick} />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
