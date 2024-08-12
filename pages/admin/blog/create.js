import React, { useContext, useState } from "react";
import styles from "/styles/blog.module.css";
import { v4 } from "uuid";
import { NotificationProvider } from "@/pages/_app";
import SendData from "@/components/sendData";
export default function CreateComponent() {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState();
  const blog_id = v4();
  const [blog_caption, setBlogCaption] = useState("");
  const [notify, setNotify] = useContext(NotificationProvider);
  const handleImage = function (event) {
    var imageFile = event.target.files[0];
    setImage(imageFile);
    var convertedImage = URL.createObjectURL(imageFile);
    setShowImage(convertedImage);
  };

  const handleText = function (event) {
    const { value } = event.target;
    setBlogCaption(value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("blog_caption", blog_caption);
    data.append("blog_id", blog_id);
    data.append("file", image);

    var response = await SendData(
      "admin/blog/create",
      data,
      "multipart/form-data",
      false
    );
    console.log(response);
    if (response.status == 200) {
      setNotify(response.message);
    } else {
      setNotify(response.error);
    }
  };

  function ImageSelector() {
    return (
      <div className={styles.content}>
        <header>
          <h4>Select File here</h4>
        </header>
        <p>Files Supported: JPG . PNG</p>
        <input
          onChange={handleImage}
          type="file"
          accept=".jpg,.png"
          id="fileID"
          required
        />
      </div>
    );
  }

  return (
    <div className="pad_container">
      <div className={styles.container}>
        <form onSubmit={submitForm} className={styles.card}>
          <h3>Create Blog Post</h3>
          <div className={styles.drop_box}>
            {showImage ? <img src={showImage} /> : <ImageSelector />}
          </div>
          <textarea
            required
            onChange={handleText}
            placeholder="Caption"
          ></textarea>
          <label htmlFor="fileID" className={styles.btn}>
            Choose File
          </label>
          <button type="submit" className={styles.btn}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
