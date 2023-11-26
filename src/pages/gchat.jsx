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

const GooPimChat = ({
  currentUser,
  recipientUser,
  conversationId,
  closePopup,
  openPopup,
  contractPopup,
}) => {
  //const myUserId = Cookies.get("userId");

  //const [contractPopup, setContractPopup] = useState(false);
  useState(false);
  const authUserId = useSelector(selectAuthUser);
  const router = useRouter();
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
  if (userId === recipientUser) {
    recipientUser = currentUser;
  }
  const sendMessage = () => {
    //emit conversation id and current-loggen user in and the other user id
    //then run a check before joining the conversation room
    //socket.emit("new_message", messageText);
    if (messageText.trim() === "") {
      return;
    }
    inputReferance.current.value = "";
    const data = {
      sender_id: userId,
      receiver_id: recipientUser,

      text: messageText,
      type: "normal",
    };
    socket.emit("join_conversation", conversationId);
    console.log("authUserId", userId);
    /*     socket.emit("new_message", data);
    setMessageText(""); */
    /*   useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to server!");
      });

      socket.on("new_message", (data) => {
        setMessages([...messages, data.message]);
        setConversations(data.conversations);
      });

      socket.on("join_conversation", (conversationId) => {
        setCurrentConversationId(conversationId);
      });

      socket.on("conversations", (data) => {
        setConversations(data.conversations);
      });

      return () => {
        socket.disconnect();
      };
    }, [messages]); */

    /*     fetch(`${BACKEND_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessageText("");
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      }); */

    axios
      .post(`${BACKEND_URL}/api/messages`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        response.data;
        inputRef.current.value = "";
        setMessageText("");
      })
      .then((data) => {
        if (data.success) {
          setMessageText("");
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const socket = socketIO(`https://goopim.herokuapp.com`);
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to server!");
    });
    socket.on("error", (error) => {
      console.log("Socket error:", error);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      // Attempt to reconnect here if needed
    });
    socket.emit("join_conversation", { conversationId });
    const handler = (data) => {
      const updateMessage = data.message[0];
      setMessages((prevState) => [...prevState, updateMessage]);

      //setConversations(data.conversations);
      console.log("Received new message:", data.message[0]);
      //setMessageText("");
    };
    socket.on("new_message", (data) => {
      const updateMessage = data.message[0];
      setMessages((prevState) => [...prevState, updateMessage]);

      console.log("Received new  contract message:", data.message[0]);
    });
    socket.on("edit_contract", (data) => {
      const updateMessage = data.message[0];
      console.log("updated contract:", data.message[0]);

      const newMessages = messages.map((message) => {
        if (message.id === updateMessage.id) {
          return {
            ...message,

            text: updateMessage.text,
          };
        } else {
          return message;
        }
      });
      setMessages(
        newMessages.filter((message) => message.id !== updateMessage.id)
      );
    });

    return () => {
      socket.off("new_message");
      socket.off("edit_contract");
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, []);

  const fetchRecentMessages = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/groupmessages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(response.data.messages);
      console.log(response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRecentMessages();
  }, [conversationId]);

  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    if (buttonId.startsWith("accept-")) {
      const contractId = buttonId.slice(7);
      acceptContract(contractId);
    } else if (buttonId.startsWith("reject-")) {
      const contractId = buttonId.slice(7);
      rejectContract(contractId);
    }
  };

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
        toast.error(error.response.data.error);
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
        toast.error(error.response.data.error);
      });
  };

  /* useEffect(() => {
    /*    socket.on("connect", () => {
      console.log("Connected to server!");
    }); 
    const data = {
      sender_id: currentUserId,
      receiver_id: recipientUserId,
    };
    const handleClearInput = () => {
      setMessageText("");
    };
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  */

  return (
    <div className="absolute bottom-0 right-0">
      <ToastContainer
        position="bottom-center"
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
      <MessageList
        className="rce-container-mlist "
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={messages.map((message) => ({
          position: message.sender_id == userId ? "right" : "left",
          type: "text",
          text: <div dangerouslySetInnerHTML={{ __html: message.text }} />,
          // date: new Date(message.created_at),
          /*      avatar:
            message.sender_id === 12
              ? "currentUser.avatar"
              : "recipientUser.avatar", */
        }))}
      />

      <div ref={messageListRef}></div>
      <Input
        referance={inputReferance}
        placeholder="Type your message..."
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        rightButtons={[
          <Button
            color="white"
            backgroundColor="black"
            text="Send"
            onClick={sendMessage}
          />,
        ]}
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
                  userId={authId}
                  providerId={recipientUser}
                  conversationId={conversationId}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default GooPimChat;
