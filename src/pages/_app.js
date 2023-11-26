import { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";

import "@/styles/globals.css";
import "@/styles/app.css";
import Navbar from "@/components/navbar";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store/slices/authSlice";
import { store, persistor } from "../store/store";
import Footer from "@/components/newfooter";
import Messages from "./messages";
import CometChatWidget from "@/components/cometchatwidgettwo";
export const AuthContext = createContext();

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <Component {...pageProps} />
        <CometChatWidget />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
