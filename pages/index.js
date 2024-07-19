import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { NavBarProvider } from "./_app";
import React, { Component, useContext } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export default function Home() {
  const [dirs, setDirs] = useContext(NavBarProvider);
  //./assets/logo.jpg
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div className={styles.text_box}>
          <h1>RATIONAL CYBERLABS</h1>
          <p>EDUCATE - UNITE - REVOLUTIONIZE</p>
          <a href="" className={styles.hero_btn}>
            Visit Us to Know More
          </a>
        </div>
      </section>
      <section className={styles.course}>
        <h1>Courses We Offer</h1>
        <p>The Offersv are only Techinical Domains .</p>
        <div className={styles.row}>
          <div className={styles.course_col}>
            <h3>SEMINAR</h3>
          </div>
          <div className={styles.course_col}>
            <h3>WEBINAR</h3>
          </div>
          <div className={styles.course_col}>
            <h3>TECHTALK</h3>
          </div>
        </div>
      </section>

      <section className={styles.campus}>
        <h1>OUR DOMAINS</h1>
        <p> Our special domains</p>
        <div className={styles.row}>
          <div className={styles.campus_col}>
            <img src="/assets/cyber security.png" alt="" />
            <div className={styles.layer}>
              <h3>CYBER SECURITY</h3>
            </div>
          </div>
          <div className={styles.campus_col}>
            <img src="/assets/ethical hacking.jpg" alt="" />
            <div className={styles.layer}>
              <h3>ETHICAL HACKING</h3>
            </div>
          </div>
          <div className={styles.campus_col}>
            <img src="/assets/AI.png" alt="" />
            <div className={styles.layer}>
              <h3>ARTIFICIAL INTELLIGENCE</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facilities}>
        <h1>OUR DOMAINS</h1>
        <p>our Technical Domains.</p>
        <div className={styles.row}>
          <div className={styles.campus_col}>
            <img src="/assets/IOT.webp" alt="" />
            <div className={styles.layer}>
              <h3>INTERNET OF THINGS</h3>
            </div>
          </div>
          <div className={styles.campus_col}>
            <img src="/assets/hh.png" alt="" />
            <div className={styles.layer}>
              <h3>HARDWARE HACKING</h3>
            </div>
          </div>
          <div className={styles.campus_col}>
            <img src="/assets/london.png" alt="" />
            <div className={styles.layer}>
              <h3>DOMAIN SOOOOON...!</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h1>CHECKOUT OUR TEAM</h1>

        <div className={styles.row}>
          <div className={styles.testimonial_col}>
            <img src="/assets/domi.jpg" alt="" />
            <div>
              <p>EXECUTIVE CONTROLLER</p>
              <h3>EZHILAN</h3>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className={styles.testimonial_col}>
            <img src="/assets/viki.jpg" alt="" />
            <div>
              <p>EXECUTIVE SUPERVISER</p>
              <h3>VIGNESH</h3>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h1>Endroll For Our Various Online Courses</h1>
        <a href="" className={styles.hero_btn}>
          CONTACT US
        </a>
      </section>

      <section className={styles.footer}>
        <h4>About Us</h4>
        <p>EDUCATE - UNITE - REVOLUTIONISE</p>
        <div className={styles.icons}>
          <a href="https://www.instagram.com/rationalcyberlabs/">
            <FontAwesomeIcon
              className={styles.social_icons}
              icon={faInstagram}
            ></FontAwesomeIcon>
          </a>

          <a href="https://www.facebook.com/profile.php?id=61554737617494">
            <FontAwesomeIcon
              className={styles.social_icons}
              icon={faFacebook}
            ></FontAwesomeIcon>
          </a>

          <a href="https://chat.whatsapp.com/DYbBLgixw7DITelxUvZjDw">
            <FontAwesomeIcon
              className={styles.social_icons}
              icon={faWhatsapp}
            ></FontAwesomeIcon>
          </a>
        </div>
        <p>
          THANK
          <FontAwesomeIcon
            className={styles.social_icons}
            icon={faHeart}
          ></FontAwesomeIcon>
          YOU
        </p>
      </section>
    </div>
  );
}
