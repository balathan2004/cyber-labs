import styles from "/styles/login.module.css";
import SendData from "@/components/sendData";
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
import { LoaderProvider, NotificationProvider } from "@/pages/_app";
export default function Welcome() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);
  const navi = useRouter();
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
    username: "",
  });
  const [response, setResponse] = useState({});
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(NotificationProvider);
  const [showPass, setShowPass] = useState(false);

  const handlerPass = () => {
    setShowPass((prev) => !prev);
  };

  useEffect(() => {
    if (response) {
      if (response.message && response.data) {
        console.log(response);
        localStorage.setItem("cyberLabs_Data", JSON.stringify(response.data));
        setIsLogin("account");
        navi.push("/account");
      } else if (response.error) {
        console.log(response.error, "error");
      }
    }
  }, [response]);

  const handler = async (event) => {
    event.preventDefault();

    setLoader(true);
    var res = await SendData("/signup", registerData);
    console.log(res);
    setLoader(false);
    if (res.authType == 200) {
      setResponse(res);

      setReply(res.message);
    } else {
      setResponse(res);
      setReply(res.error);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value.trim() }));
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
          <h1 className={styles.login__title}>Sign Up</h1>

          <div className={styles.login__content}>
            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faUser} />

              <div className={styles.login__box_input}>
                <input
                  type="email"
                  required
                  onChange={handleInput}
                  className={styles.login__input}
                  id="login-email"
                  placeholder=" "
                  name="email"
                />
                <label htmlFor="login-email" className={styles.login__label}>
                  Email
                </label>
              </div>
            </div>

            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faUser} />

              <div className={styles.login__box_input}>
                <input
                  type="text"
                  required
                  onChange={handleInput}
                  className={styles.login__input}
                  id="login-email"
                  placeholder=" "
                  name="username"
                />
                <label htmlFor="login-email" className={styles.login__label}>
                  Your Name
                </label>
              </div>
            </div>

            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faLock} />
              <div className={styles.login__box_input}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  onChange={handleInput}
                  className={styles.login__input}
                  id="login-pass"
                  placeholder=" "
                  name="password"
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

          <div className={styles.login__check}></div>

          <button type="submit" className={styles.login__button}>
            Register
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
            have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

//<FontAwesomeIcon icon={faEye} />
