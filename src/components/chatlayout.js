import React, { useEffect } from "react";
import Head from "next/head";
import initializeCometChatWidget from "./cometchatwidget";

const Layout = ({ children }) => {
  useEffect(() => {
    initializeCometChatWidget();
  }, []);
  return (
    <div>
      <Head>{/* Add any necessary meta tags or scripts */}</Head>
      {/* Rest of your layout */}
      <div id="cometchat-widget-container" />
    </div>
  );
};

export default Layout;
