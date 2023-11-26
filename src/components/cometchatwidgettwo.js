import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReceiverId } from "@/store/slices/authSlice";

const CometChatWidget = () => {
  var cometChatWidget;
  const dispatch = useDispatch();
  let messageReceiverId = useSelector(selectReceiverId);

  useEffect(() => {
    console.log("reduxReceiverId:", messageReceiverId);
    const script = document.createElement("script");
    script.src = "https://widget-js.cometchat.io/v3/cometchatwidget.js";
    script.async = true;
    script.onload = () => {
      cometChatWidget = window.CometChatWidget;
      cometChatWidget
        .init({
          appID: "2399887cdeccbaac",
          appRegion: "eu",
          authKey: "f7b5aed300195136a4879d15826f6db1dba0bb6d",
          target: "#cometchat-widget-container",
        })
        .then(
          (response) => {
            console.log("CometChat Widget initialized successfully.");
            cometChatWidget
              .login({
                uid: localStorage.getItem("token2"),
              })
              .then(
                (response) => {
                  cometChatWidget.launch({
                    widgetID: "808161cc-4750-48c1-bc02-8a8e5079bbbb",
                    target: "#cometchat-widget-container",
                    roundedCorners: "true",
                    height: "450px",
                    width: "400px",
                    docked: "true",
                    alignment: "right",
                    defaultID: "superhero1", //default UID (user) or GUID (group) to show,
                    defaultType: "user", //user or group
                  });
                },
                (error) => {
                  console.log("CometChat Widget login:", error);
                }
              );
          },
          (error) => {
            console.log(
              "CometChat Widget initialization failed with error:",
              error
            );
          }
        );
    };

    document.body.appendChild(script);

    // Clean up the script element when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);
  useEffect(() => {
    if (messageReceiverId) {
      cometChatWidget?.chatWithUser(messageReceiverId);
      console.log("message clicked", messageReceiverId);
    }
  }, [messageReceiverId]);
  return (
    <>
      <div id="cometchat-widget-container"></div>
    </>
  );
};

export default CometChatWidget;
