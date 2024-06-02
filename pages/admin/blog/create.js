import React, { useContext, useState } from "react";
import style from "/styles/admin.module.css";
import { v4 } from "uuid";
import { NotificationProvider } from "@/pages/_app";
import SendData from "@/components/sendData";
export default function CreateComponent() {
  const [image, setImage] = useState({ file: [] });
  const [showImage, setShowImage] = useState([]);
  const [blogDetails, setBlogDetails] = useState({
    blog_id: v4(),
    blog_caption: null,
    broadcast: false,
  });
  const [notify, setNotify] = useContext(NotificationProvider);
  const handleImage = function (event) {
    var imageFile = event.target.files[0];
    setImage(imageFile);
    var convertedImage = URL.createObjectURL(imageFile);
    setShowImage(convertedImage);
  };

  const handleText = function (event) {
    const { name, value } = event.target;
    setBlogDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    var trimmedData = Object.fromEntries(
      Object.entries(blogDetails).map(([key, value]) => [
        key,
        value ? value.trim() : null,
      ])
    );

    if (trimmedData.blog_caption && trimmedData.blog_id) {
    } else {
      console.log("value is missing");
    }

    const data = new FormData();
    data.append("blog_caption", trimmedData.blog_caption);
    data.append("broadcast", trimmedData.broadcast);
    data.append("blog_id", trimmedData.blog_id);
    data.append("file", image);
    const url = "/admin/blog/create";

    var response = await SendData(url, data, "multipart/form-data", false);
    console.log(response);
    if (response.message) {
      setNotify(response.message);
    } else {
      setNotify(response.error);
    }
  };

  return (
    <div className="pad_container">
      <div className={style.content}>
        <form onSubmit={submitForm}>
          <h1>Create Blog Post (Single)</h1>

          <div className={style.video_details}>
            <div className={style.thumbnail}>
              <input
                type="file"
                id="file"
                onChange={handleImage}
                required
                className={style.hidden_input}
              ></input>
              <label htmlFor="file" className={style.select_label}>
                Select Image
              </label>
              <img src={showImage ? showImage : ""}></img>
            </div>
            <div className={style.video_text}>
              <textarea
                onChange={handleText}
                required
                placeholder="Caption"
                name="blog_caption"
                value={blogDetails.blog_caption ? blogDetails.blog_caption : ""}
              ></textarea>
              <input type="checkbox" onChange={handleText} />
              <span>Send Announcement Mail to All users</span>

              <button>Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
