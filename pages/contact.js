import styles from "/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPhone,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { NotificationProvider } from "./_app";
import Notification from "@/components/notification";
import { useState, useContext } from "react";
import SendData from "@/components/sendData";
export default function Contact() {
  const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [notify, setNotify] = useContext(NotificationProvider);

  const [formMessage, setFormMessage] = useState(initialState);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormMessage((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await SendData("/admin/mailer", formMessage);

    if (response.authType == 200) {
      setNotify(response.message);
      setFormMessage(initialState);
    } else {
      setNotify(response.error);
    }
  };

  return (
    <div className="pad_container">
      <section className={styles.sub_header}>
        <h1>Contact Us</h1>
      </section>

      <section className={styles.contact_us}>
        <div className={styles.row}>
          <div className={styles.contact_col}>
            <div>
              <FontAwesomeIcon
                className={styles.icons}
                icon={faHouse}
              ></FontAwesomeIcon>
              <span>
                <h5>loading...!</h5>
                <p>location soon...!</p>
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                className={styles.icons}
                icon={faPhone}
              ></FontAwesomeIcon>
              <span>
                <h5>8098149095 , 9360633213</h5>
                <p>all the day time the quries will be expained...! </p>
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                className={styles.icons}
                icon={faEnvelope}
              ></FontAwesomeIcon>
              <span>
                <h5>rationalcyberlabs@gmail.com</h5>
                <p>Email us for your doughts and feedback </p>
              </span>
            </div>
          </div>
          <div className={styles.contact_col}>
            <form onSubmit={submitForm}>
              <input
                type="text"
                name="name"
                placeholder="Enter Your good Name"
                onChange={handleInput}
                value={formMessage.name}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter perfect Email"
                value={formMessage.email}
                onChange={handleInput}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Enter Your selected Subject"
                value={formMessage.subject}
                onChange={handleInput}
                required
              />
              <textarea
                rows="8"
                name="message"
                placeholder="enter your awosame Message"
                value={formMessage.message}
                onChange={handleInput}
                required
              ></textarea>
              <button type="submit" className={styles.red_btn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.footer}>
        <h4>About Us</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          error asperiores vero vel incidunt sit!
        </p>
        <div className={styles.icons}>
          <FontAwesomeIcon
            className={styles.social_icons}
            icon={faFacebook}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className={styles.social_icons}
            icon={faTwitter}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className={styles.social_icons}
            icon={faInstagram}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className={styles.social_icons}
            icon={faLinkedin}
          ></FontAwesomeIcon>
        </div>
      </section>
    </div>
  );
}
