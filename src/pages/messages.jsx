import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
export default function Messages() {
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", (event) => {
      CometChatWidget.init({
        APP_ID: "2399887cdeccbaac",
        REGION: "eu",
        AUTH_KEY: "f7b5aed300195136a4879d15826f6db1dba0bb6d",
        API_KEY: "698f477cf5dfc1c264d65ebd9605fecdf458f6da",
      }).then(
        (response) => {
          console.log("Initialization completed successfully");
          //You can now call login function.
          CometChatWidget.login({
            uid: "645ed435-6d3e-42da-8dab-50c7ce8498b6",
          }).then(
            (response) => {
              CometChatWidget.launch({
                widgetID: "808161cc-4750-48c1-bc02-8a8e5079bbbb",
                docked: "true",
                alignment: "left", //left or right
                roundedCorners: "true",
                height: "450px",
                width: "400px",
                target: "#cometchat",
                defaultID: "superhero1", //default UID (user) or GUID (group) to show,
                defaultType: "user", //user or group
              });
            },
            (error) => {
              console.log("User login failed with error:", error);
              //Check the reason for error and take appropriate action.
            }
          );
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          //Check the reason for error and take appropriate action.
        }
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>Messages 12</title>
      </Head>
      <Script
        src="https://widget-js.cometchat.io/v3/cometchatwidget.js"
        strategy="afterInteractive"
        onLoad={() =>
          console.log(`script loaded correctly, commetchat has been populated`)
        }
      />
      <h1>Messages</h1>
    </>
  );
}
