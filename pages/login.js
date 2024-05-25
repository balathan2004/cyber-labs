import LoginBox from "@/components/login";
import styles from "/styles/login.module.css";
import SignUpBox from "@/components/signup";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavBarProvider } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
    <div className="pad_container">
      <div className={styles.login}>
        <img
          src="images/login-bg.png"
          alt="login image"
          className={styles.login__img}
        />

        <form className={styles.login__form}>
          <h1 className={styles.login__title}>Login</h1>

          <div className={styles.login__content}>
            <div className={styles.login__box}>
              <FontAwesomeIcon className={styles.icons} icon={faUser} />

              <div className={styles.login__box_input}>
                <input
                  type="email"
                  required
                  className={styles.login__input}
                  id="login-email"
                  placeholder=" "
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
                  type="password"
                  required
                  className={styles.login__input}
                  id="login-pass"
                  placeholder=" "
                />
                <label htmlFor="login-pass" className={styles.login__label}>
                  Password
                </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

          <div className={styles.login__check}>
            <div className={styles.login__check_group}>
              <input
                type="checkbox"
                className={styles.login__check_input}
                id="login-check"
              />
              <label
                htmlFor="login-check"
                className={styles.login__check_label}
              >
                Remember me
              </label>
            </div>

            <a href="#" className={styles.login__forgot}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.login__button}>
            Login
          </button>

          <button className={styles.login__button}>
            Continue With <span>Google</span>
          </button>
          <p className={styles.login__register}>
            Don't have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
