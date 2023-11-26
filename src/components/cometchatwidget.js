import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReceiverId } from "@/store/slices/authSlice";

const initializeCometChatWidget = () => {
  const dispatch = useDispatch();
  const reduxReceiverId = useSelector(selectReceiverId);
  const script = document.createElement("script");
  script.src = "https://widget-js.cometchat.io/v3/cometchatwidget.js";
  script.async = true;
  script.onload = () => {
    window.CometChatWidget.init({
      appID: "2399887cdeccbaac",
      appRegion: "eu",
      authKey: "f7b5aed300195136a4879d15826f6db1dba0bb6d",
      target: "#cometchat-widget-container",
    }).then(
      (response) => {
        console.log("CometChat Widget initialized successfully.");
        CometChatWidget.login({
          uid: "645ed435-6d3e-42da-8dab-50c7ce8498b6",
        }).then(
          (response) => {
            CometChatWidget.launch({
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
  useEffect(() => {
    if (reduxReceiverId) {
      dispatch(window.CometChatWidget.chatWithUser(reduxReceiverId));
    }
  }, [reduxReceiverId]);
  document.body.appendChild(script);
};

export default initializeCometChatWidget;
