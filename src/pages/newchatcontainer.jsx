import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import UserRooms from "./contractlist";
import GooPimChat from "./goopimchat";
import { io } from "socket.io-client";
import { BACKEND_URL } from "@/utils";
import { useRouter } from "next/router";
import { set } from "react-hook-form";
//const socket = io(`https://goopim.herokuapp.com`);
function NewChatContainer() {
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
  const [chatInterfaces, setChatInterfaces] = useState([]);
  const [chatInterfaceList, setChatInterfaceList] = useState([]);
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
    // Check if there is already a chat interface for the receiverId and userId
    const chatInterface = chatInterfaces.find(
      (chat) => chat.receiverId === receiverId && chat.userId === userId
    );

    // If there is no chat interface, create one
    if (!chatInterface) {
      setChatInterfaces((prevState) => {
        return [
          ...prevState,
          {
            id: chatInterfaceList.length + 1,
            conversationId,
            receiverId,
            userId,
            freelancer_name,
            freelancer_profile_url,
            employer_name,
            employer_profile_url,
            isOpen: true,
            isMinimized: false,
          },
        ];
      });
    }

    // Set the chat interface to be open
    setChatInterfaces((prevState) => {
      return [
        ...prevState,
        {
          id: chatInterfaceList.length + 1,
          conversationId,
          receiverId,
          userId,
          freelancer_name,
          freelancer_profile_url,
          employer_name,
          employer_profile_url,
          isOpen: true,
          isMinimized: false,
        },
      ];
    });

    // Position the chat interface to the bottom right corner of the screen

    // Update the chat interface list
    setChatInterfaceList([...chatInterfaceList, chatInterfaces.id]);
  }
  return (
    <div className="flex h-fit bg-gray-100 border-t border-t-black">
      <div
        className={`flex-shrink-0 w-56 bg-white border-r border-r-black border-r ${
          isMenuOpen ? "" : "hidden"
        } sm:block`}
      >
        <UserRooms handleChatListItemClick={handleChatListItemClick} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center bg-white p-4 border-b">
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
            <div className="mr-4 p-1">
              <div>{isFreelancer && <p> {employerName}</p>}</div>
              <div> {isEmployer && <p> {freelancerName}</p>}</div>
            </div>
          </div>
          <div className="mr-10">
            {" "}
            {isFreelancer ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  openPopup();
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
          <div className="chat-interfaces">
            {chatInterfaceList.map((chatInterfaceId) => (
              <div key={chatInterfaceId}>
                <GooPimChat
                  chatInterfaceId={chatInterfaceId}
                  onClose={() => {
                    setChatInterfaces(
                      chatInterfaces.filter(
                        (chat) => chat.id !== chatInterfaceId
                      )
                    );
                  }}
                  onMinimize={() => {
                    chatInterfaces.forEach((chat) => {
                      if (chat.id === chatInterfaceId) {
                        chat.isMinimized = true;
                      }
                    });
                  }}
                  onMaximize={() => {
                    chatInterfaces.forEach((chat) => {
                      if (chat.id === chatInterfaceId) {
                        chat.isMinimized = false;
                      }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewChatContainer;
