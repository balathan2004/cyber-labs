import style from "/styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "./sendData";
import React, { useContext, useState } from "react";
import loginMethod from "./method";
import { LoaderProvider, NotificationProvider } from "@/pages/_app";

export default function LoginBox({ parentResponseState }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(NotificationProvider);
  const [response, setResponse] = useState("");
  const handler = async (event) => {
    event.preventDefault();
    const data = { email: email, password: password };
    setLoader(true);
    var res = await SendData("login", data);
    setLoader(false);
    if (res.message && res.data) {
      setReply(res.message);
      setResponse(res.message);
      parentResponseState(res);
    } else {
      setReply(res.error);
      setResponse(res.error);
      parentResponseState(res);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>Login</span>
          </div>
          <h3 className={style.errorMsg}>{response ? response : ""}</h3>
        </header>
        <div className={style.inner_content}>
          <div className={style.social}>
            <FontAwesomeIcon
              className={style.icon}
              icon={faGoogle}
              onClick={() =>
                loginMethod("google", setResponse, parentResponseState)
              }
            />
            <FontAwesomeIcon className={style.icon} icon={faFacebookF} />
          </div>

          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <span className={style.idea}>Forget password?</span>
            </div>
            <div className={style.footer}>
              <button>login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
