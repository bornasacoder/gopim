import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLocalStorage from "use-local-storage";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./_app";
import { BACKEND_URL } from "@/utils";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectAuthUser, selectAuthState } from "../store/slices/authSlice";

//const socket = io("http://localhost:5000");
//comments
import { socket } from "../components/socketio";
import InlineContractDeposit from "@/components/acceptcontract";

const UserRooms = (props) => {
  const [paymentPopup, setPaymentPopup] = useState(false);
  const router = useRouter();
  const authStatus = useSelector(selectAuthState);
  //const { isAuthenticated, user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [currentContractId, setCurrentContractId] = useState("");
  const [amountRemaining, setAmountRemaining] = useState("");
  const [loadingContract, setLoadingContract] = useState(false);
  useEffect(() => {
    checkAuthStatus();
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, []);
  const closePopup = () => {
    setPaymentPopup(false);
  };
  const openPopup = () => {
    setPaymentPopup(true);
  };
  const checkAuthStatus = () => {
    if (!authStatus) {
      router.push("/login");
    }
  };
  const loadFirstMessage = (room) =>
    props.handleChatListItemClick(
      room[0].id,
      room[0].otherUserId,
      room[0].currentUserId,
      room[0].freelancer_name,
      room[0].freelancer_profile_url,
      room[0].employer_name,
      room[0].employer_profile_url
    );
  const fetchRooms = async () => {
    setLoadingContract(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user_rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRooms(response.data.rooms);
      loadFirstMessage(response.data.rooms);
      console.log(response.data.rooms);
    } catch (error) {
      setLoadingContract(false);
      console.error(error);
    }
    setLoadingContract(false);
  };
  useEffect(() => {
    //socket.emit("join_conversation", { conversationId: "conversationId-1" });

    fetchRooms();
  }, []);
  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    if (buttonId.startsWith("accept-")) {
      const contractId = buttonId.slice(7);
      setCurrentContractId(buttonId.slice(7));
      acceptContract(contractId);
    } else if (buttonId.startsWith("reject-")) {
      const contractId = buttonId.slice(7);
      rejectContract(contractId);
    }
  };
  useEffect(() => {
    const button = document.querySelector('[id^="accept-"]');
    if (button && isFreelancer) {
      button.style.display = "none";
    }
  }, []);
  const acceptContract = (contractId) => {
    // make a POST request to your Flask backend to accept the contract
    console.log("accepted contract", contractId);
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "ACCEPTED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Contract Accepted and project created! Refresh chat");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          //open payment pop up
          //setPaymentPop(true);
          setAmountRemaining(error.response.data.amount_remaining);
        }
        openPopup();
      });
  };

  const rejectContract = (contractId) => {
    // make a POST request to your Flask backend to reject the contract
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "CANCELLED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Contract rejected! Refresh chat");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.error);
      });
  };
  return (
    <div className="flex flex-col items-center bg-white w-full mt-12">
      <button
        className="bg-primary text-white p-2 m-2 rounded-md"
        onClick={() => fetchRooms()}
      >
        {loadingContract ? (
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
        ) : (
          "Refresh contract list"
        )}
      </button>
      <div className="w-full max-w-md">
        {rooms.length === 0 ? (
          <div className=" mt-12 p-4 ">
            <div className="w-content flex flex-col items-center  bg-gray-100">
              <img src="/empty_list.svg" />
              {isEmployer && (
                <div>
                  <p className="font-sm px-2">
                    No freelancer has a contract yet
                  </p>
                  <p className="font-bold px-2 py-2">
                    Go to <Link href="/">Provider</Link> and hire/send a message
                    to a freelancer & give them access to send you a contract
                  </p>
                </div>
              )}
              {isFreelancer && (
                <div>
                  {" "}
                  <p className="font-sm px-2">
                    No employer to send a contract yet
                  </p>
                  <p className="font-bold px-2 py-2">
                    Once they send yo the first message you will have access to
                    send them a contract
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-secondary w-full">
            {rooms.map((room) => (
              <li
                key={room.id}
                className="py-4 border-t border-b border-secondary w-full cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() =>
                  props.handleChatListItemClick(
                    room.id,
                    room.otherUserId,
                    room.currentUserId,
                    room.freelancer_name,

                    room.freelancer_profile_url,
                    room.employer_name,
                    room.employer_profile_url
                  )
                }
              >
                <div className="flex items-center w-full">
                  {isEmployer && (
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={`${room.freelancer_profile_url}`}
                      alt={`profile picture`}
                    />
                  )}
                  {isFreelancer && (
                    <>
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={`${room.employer_profile_url}`}
                        alt={`profile picture}`}
                      />
                      <span className="font-bold px-2">
                        {room.employer_name}
                      </span>
                    </>
                  )}
                  <div className="ml-4 px-2">
                    <p className="text-gray-500">
                      {(
                        <div
                          dangerouslySetInnerHTML={{
                            __html: room.last_message,
                          }}
                        />
                      ) || "No messages yet"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <>
        {paymentPopup && (
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
                <InlineContractDeposit
                  acceptContract={acceptContract}
                  openPopup={openPopup}
                  closePopup={closePopup}
                  currentContractId={currentContractId}
                  amountRemaining1={amountRemaining}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UserRooms;
