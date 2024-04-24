import React, { useContext, useState, useEffect } from "react";
import style from "/styles/account.module.css";
import { deleteCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/components/accountInput";
import SendData from "@/components/sendData";
import { LoaderProvider, NotificationProvider, NavBarProvider } from "./_app";
import { defaultImage } from "@/components/smallComponents";
import { useRouter } from "next/router";
export default function Account() {
  const [loginCred, setLoginCred] = useState({
    email: "",
    phone: "",
    uid: "",
    username: "",
  });

  const navi = useRouter();

  const [loader, setLoader] = useContext(LoaderProvider);
  const [notify, setNotify] = useContext(NotificationProvider);
  const [dirs, setDirs] = useContext(NavBarProvider);

  const [image, setImage] = useState({ file: [] });
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState(null);

  const handleImage = (event) => {
    var file = event.target.files[0];
    var urlImage = URL.createObjectURL(file);
    setShowImage(urlImage);
    setImage(file);
    setImageChange((prev) => !prev);
  };

  const errorImageHandler = () => {
    setShowImage(defaultImage(loginCred.username));
  };

  const handler = async (event) => {
    event.preventDefault();
    setLoader(true);

    const response = await SendData("/update-user", loginCred);
    console.log(response);
    setLoader(false);
  };

  const Logout = () => {
    localStorage.removeItem("cyberLabs_Data");
    deleteCookie("cyberLabs_uid");
    setNotify("Logged out successfully");

    setDirs("login");
    navi.push("/");
  };

  useEffect(() => {
    try {
      let renderData = JSON.parse(localStorage.getItem("cyberLabs_Data"));
      console.log(renderData);
      setLoginCred(renderData);
      setShowImage(renderData.photoUrl);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (imageChange) {
      console.log("image-change");

      var form = new FormData();
      form.append("file", image);

      SendData("/profile", form, "multipart/form-data", false);
      setImageChange((prev) => !prev);
    }
  }, [imageChange]);

  return (
    <div className="container">
      <div className={style.account}>
        <form onSubmit={handler} className={style.card}>
          <h1>Your profile</h1>
          <div className={style.profile_container}>
            <input
              type="file"
              onChange={handleImage}
              id="image"
              accept="image/jpeg, image/png"
              className={style.hideImage}
            />
            <label htmlFor="image">
              <img
                src={showImage ? showImage : defaultImage(loginCred.username)}
                referrerPolicy="no-referrer"
                onError={errorImageHandler}
              ></img>
            </label>

            <FontAwesomeIcon
              icon={faCamera}
              className={style.select_image}
            ></FontAwesomeIcon>
          </div>

          <div className={style.data_container}>
            <AccountInput
              label_name={"username"}
              differentName={"username"}
              initialValue={loginCred.username}
              changeState={setLoginCred}
            />
            <AccountInput
              label_name={"email"}
              initialValue={loginCred.email}
              changeState={setLoginCred}
              editable={false}
            />
            <AccountInput
              label_name={"phone"}
              initialValue={loginCred.phone}
              changeState={setLoginCred}
              placeholder="No phone number"
            />

            <button type="submit">Save Info</button>
            <button type="button" onClick={Logout}>
              {" "}
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
