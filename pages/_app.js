import "@/styles/globals.css";
import React, { Component, useState, useEffect } from "react";
export const NavBarProvider = React.createContext();
export const LoaderProvider = React.createContext();
export const UserCred = React.createContext();
import Notification from "@/components/notification";

export const NotificationProvider = React.createContext();
import GetRequest from "@/components/getRequest";
import { getCookie } from "cookies-next";
import Loading from "@/components/loading";
import NavBar from "@/components/navbar";

export default function App({ Component, pageProps }) {
  const [isLogin, setIsLogin] = useState("login");
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notify, setNotify] = useState(null);

  const getCred = async () => {
    try {
      let res = await GetRequest("login-cred");
      if (!res.error) {
        setUserData(res.message);
        localStorage.setItem("cyberLabs_Data", JSON.stringify(res.message));
        const checkCookie = getCookie("cyberLabs_uid");
        setIsLogin(checkCookie ? "account" : "login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCred();
  }, []);

  return (
    <div className="container">
      <NavBarProvider.Provider value={[isLogin, setIsLogin]}>
        <LoaderProvider.Provider value={[loader, setLoader]}>
          <NotificationProvider.Provider value={[notify, setNotify]}>
            <UserCred.Provider value={userData}>
              {notify ? (
                <Notification notify={notify} setNotify={setNotify} />
              ) : null}
              {loader ? <Loading /> : null}
              <NavBar />
              <Component {...pageProps} />
            </UserCred.Provider>
          </NotificationProvider.Provider>
        </LoaderProvider.Provider>
      </NavBarProvider.Provider>
    </div>
  );
}
