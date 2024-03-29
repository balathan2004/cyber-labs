import style from "/styles/login.module.css";
import loginMethod from "./method";
import React, { useState, useEffect, useContext } from "react";
import SendData from "./sendData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";
export default function SignUpBox({ parentResponseState }) {
  const [userCred, setUserCred] = useState({
    username: "",
    email: "",
    password: "",
    retype: "",
    phone: "",
  });
  const [response, setResponse] = useState("");

  const [loader, setLoader] = useContext(LoaderProvider);
  const [passCheck, setPassCheck] = useState(null);
  const [reply, setReply] = useContext(ReplyProvider);

  // phone number disalbled
  useEffect(() => {
    if (userCred.password && userCred.retype) {
      if (userCred.password != userCred.retype) {
        setPassCheck("* password should be same");
      } else {
        setPassCheck(null);
      }
    }
  }, [userCred]);

  const handler = async (event) => {
    event.preventDefault();

    var dataToServer = userCred;
    delete dataToServer.retype;
    setLoader(true);
    var res = await SendData("/signup", dataToServer);
    console.log(res);
    setLoader(false);
    if (res.message && res.data) {
      setResponse(res.message);
      parentResponseState(res);
      setReply(res.message);
    } else {
      setResponse(res.error);
      setReply(res.error);
      parentResponseState(res);
    }
  };

  const handleInput = (event) => {
    var { name, value } = event.target;

    setUserCred((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>SignUp</span>
            <span className={style.secondSpan}>/</span>
          </div>
          <div>
            <h3 className={style.errorMsg}>{response ? response : ""}</h3>
          </div>
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
          <div>
            <span className={style.idea}>or create account with email</span>
          </div>
          <form className={style.input_container} onSubmit={handler}>
            <input
              placeholder="enter username"
              name="username"
              onChange={handleInput}
              required={true}
            />
            <input
              placeholder="enter email"
              type="email"
              name="email"
              onChange={handleInput}
              required={true}
            />
            <input
              placeholder="enter phone number"
              name="phone"
              onChange={handleInput}
              required={true}
            />

            <input
              placeholder="enter password"
              name="password"
              minLength={8}
              onChange={handleInput}
              required={true}
            />
            <label className={style.retype}>{passCheck}</label>
            <input
              placeholder="retype password"
              name="retype"
              minLength={8}
              onChange={handleInput}
              required={true}
            />

            <div className={style.footer}>
              <button type="submit">SignIn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//
