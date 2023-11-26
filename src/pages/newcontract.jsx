import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import socketIO from "socket.io-client";
import {
  Input,
  Button,
  SystemMessage,
  MessageList,
  Avatar,
  MeetingLink,
  Popup,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import { useRouter } from "next/router";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../store/slices/authSlice"; //updated
import ContractForm from "./createcontract";
import { set } from "react-hook-form";

const NewContract = ({
  currentUser,
  recipientUser,

  closePopup,
  openPopup,
  contractPopup,
}) => {
  //const myUserId = Cookies.get("userId");

  //const [contractPopup, setContractPopup] = useState(false);
  useState(false);
  const authUserId = useSelector(selectAuthUser);
  const router = useRouter();
  //authId is the id of the logged in user
  const authId = Cookies.get("userId");

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(messages);
  const [userId, setUserId] = useLocalStorage("userId", "");
  const messageListRef = useRef(null);
  let inputRef = useRef();
  let inputReferance = React.createRef();

  /*   React.useEffect(() => {
    messageRef.current = messages;
  }); */
  // if (userId === recipientUser) {
  //   recipientUser = currentUser;
  // }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <>
        {contractPopup && (
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
                <ContractForm
                  closePopup={closePopup}
                  userId={currentUser}
                  providerId={recipientUser}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default NewContract;
