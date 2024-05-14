import LoginBox from "@/components/login";
import style from "/styles/login.module.css";
import SignUpBox from "@/components/signup";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider } from "@/pages/_app";

export default function Welcome() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);
  const navi = useRouter();

  const [response, setResponse] = useState("");

  useEffect(() => {
    if (response) {
      if (response.message && response.data) {
        localStorage.setItem("cyberLabs_Data", JSON.stringify(response.data));
        setIsLogin("account");
        navi.push("/account");
      } else if (response.error) {
        console.log(response.error, "error");
      }
    }
  }, [response]);

  return (
    <div className="container">
      <div className={style.inner_container}>
        <div className={style.box_container}>
          <SignUpBox parentResponseState={setResponse}></SignUpBox>
          <LoginBox parentResponseState={setResponse} />
        </div>
      </div>
    </div>
  );
}
