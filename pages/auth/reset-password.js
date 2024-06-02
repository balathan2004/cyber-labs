import styles from "/styles/login.module.css";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SendData from "@/components/sendData";

import { LoaderProvider, NotificationProvider } from "@/pages/_app";
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(NotificationProvider);
  const [response, setResponse] = useState("");

  const handler = async (event) => {
    event.preventDefault();
    const data = { email: email };
    setLoader(true);
    var res = await SendData("client/reset-password", data);
    console.log(res);
    setLoader(false);
    if (res.message && res.data) {
      setReply(res.message);
      setResponse(res);
    } else {
      setReply(res.error);
      setResponse(res);
    }
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
                  placeholder=" "
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <label htmlFor="login-email" className={styles.login__label}>
                  Email
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.login__button}>
            Enter Your Email
          </button>
        </form>
      </div>
    </div>
  );
}
