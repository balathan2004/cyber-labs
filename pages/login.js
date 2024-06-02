import LoginBox from "@/components/login";
import styles from "/styles/login.module.css";
import SignUpBox from "@/components/signup";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "@/components/method";
import SendData from "@/components/sendData";

import { LoaderProvider, NotificationProvider } from "@/pages/_app";
export default function Welcome() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);
  const navi = useRouter();
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(NotificationProvider);
  const [response, setResponse] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handlerPass = () => {
    setShowPass((prev) => !prev);
  };

  const handler = async (event) => {
    event.preventDefault();
    const data = { email: loginData.email, password: loginData.password };
    setLoader(true);
    var res = await SendData("login", data);
    setLoader(false);
    if (res.message && res.data) {
      setReply(res.message);
      setResponse(res);
    } else {
      setReply(res.error);
      setResponse(res);
    }
  };

  useEffect(() => {
    if (response) {
      if (response.authType === 200) {
        console.log(response);
        localStorage.setItem("cyberLabs_Data", JSON.stringify(response.data));
        setIsLogin("account");
        navi.push("/account");
      } else if (response.authType === 400) {
        console.log(response.error, "error");
      }
    }
  }, [response]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <div className="pad_container">
      <div className={styles.login}>
        <img
          src="images/login-bg.png"
          alt="login image"
          className={styles.login__img}
        />

        <form className={styles.login__form} onSubmit={handler}>
          <h1 className={styles.login__title}>Login</h1>

          <div className={styles.login__content}>
            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faUser} />

              <div className={styles.login__box_input}>
                <input
                  type="email"
                  required
                  className={styles.login__input}
                  name="email"
                  id="login-email"
                  placeholder=" "
                  onChange={handleInput}
                />
                <label htmlFor="login-email" className={styles.login__label}>
                  Email
                </label>
              </div>
            </div>

            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faLock} />
              <div className={styles.login__box_input}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  name="password"
                  className={styles.login__input}
                  id="login-pass"
                  placeholder=" "
                  onChange={handleInput}
                />
                <label htmlFor="login-pass" className={styles.login__label}>
                  Password
                </label>
                <FontAwesomeIcon
                  icon={showPass ? faEyeSlash : faEye}
                  onClick={handlerPass}
                  className={styles.login__eye}
                />
              </div>
            </div>
          </div>

          <div className={styles.login__check}>
            <div className={styles.login__check_group}>
              <input
                type="checkbox"
                className={styles.login__check_input}
                id="login-check"
                value={true}
                onChange={handleInput}
              />
              <label
                htmlFor="login-check"
                className={styles.login__check_label}
              >
                Remember me
              </label>
            </div>

            <a href="/auth/reset-password" className={styles.login__forgot}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.login__button}>
            Login
          </button>

          <button
            type="button"
            className={styles.login__button}
            onClick={() => {
              GoogleLogin(setResponse);
            }}
          >
            Continue With <span>Google</span>
          </button>
          <p className={styles.login__register}>
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
