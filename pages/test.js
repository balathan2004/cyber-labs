import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SendData from "@/components/sendData";
import { defaultImage } from "@/components/smallComponents";

export default function Account() {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState(null);

  const handleImage = (event) => {
    var file = event.target.files[0];
    var urlImage = URL.createObjectURL(file);
    setShowImage(urlImage);
    setImage(file);
  };

  const errorImageHandler = () => {
    setShowImage(defaultImage(loginCred.username));
  };

  async function submitForm(event) {
    event.preventDefault();
    console.log("image-change");
    var form = new FormData();
    form.append("name", "hinata");
    form.append("file", image);
    SendData("/test", form, "multipart/form-data", false);
  }

  return (
    <div className="container">
      <div>
        <form onSubmit={submitForm}>
          <h1>Your profile</h1>

          <input
            type="file"
            onChange={handleImage}
            id="image"
            accept="image/jpeg, image/png"
          />

          <img
            src={showImage ? showImage : defaultImage("hi")}
            referrerPolicy="no-referrer"
            width={"200px"}
            onError={errorImageHandler}
          ></img>
          <button>add image</button>
        </form>
      </div>
    </div>
  );
}
