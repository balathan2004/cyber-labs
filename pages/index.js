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
export default function Home() {
  const [dirs, setDirs] = useContext(NavBarProvider);
  return (
    <div className="container">
      <div className={styles.container}>
        <div className={`${styles.page} ${styles.page_one}`}>
          <header className={styles.firsthead}>
            <div className={styles.navs}>
              <div className={styles.nav_left}>
                <a href="/courses">Courses</a>
                <a>About</a>
                <a>Contact</a>
              </div>
              <div className={styles.nav_center}>
                <span>Rational CyberLabs</span>
              </div>
              <div className={styles.nav_right}>
                <a href={`/${dirs}`}>{dirs}</a>
              </div>
            </div>
            <div className={styles.head_content}>
              <h1>Rational Cyberlabs</h1>
            </div>
          </header>
          <div className={styles.temp}>
            <span>our moto</span>
          </div>
          <div className={styles.slider}>
            <div className={styles.slide_track}>
              <div className={styles.slide}>
                <h1>Educate</h1>
              </div>
              <div className={styles.slide}>
                <h1>Unite</h1>
              </div>
              <div className={styles.slide}>
                <h1 className={styles.last}>Revolutionize</h1>
              </div>
              <div className={styles.slide}>
                <h1>Educate</h1>
              </div>
              <div className={styles.slide}>
                <h1>Unite</h1>
              </div>
              <div className={styles.slide}>
                <h1 className={styles.last}>Revolutionize</h1>
              </div>
              <div className={styles.slide}>
                <h1>Educate</h1>
              </div>
              <div className={styles.slide}>
                <h1>Unite</h1>
              </div>
              <div className={styles.slide}>
                <h1 className={styles.last}>Revolutionize</h1>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.page} ${styles.page_two}`}>
          <div className={styles.background}></div>
          <div className={styles.content}>
            <article>
              <header>Get to know our brand</header>
              <main>
                Discover the awesome stories behind our team of cyber security
                experts. We're here to share technical news and information, and
                raise awareness about online security. We're not just any
                ordinary page - we're a platform dedicated to empowering and
                educating college and school students on cyber security. So, get
                ready to dive into the fascinating world of cyber security with
                us. Let the adventure begin!
              </main>
              <footer>
                <a>Explore Now</a>
              </footer>
            </article>
          </div>
        </div>

        <div className={styles.page}>
          <div className={styles.feed}>
            <div className={styles.first}>
              <header>
                <h1>Get In Touch!</h1>
              </header>
              <main>
                <form>
                  <div className={styles.inputBox}>
                    <label>First name</label>
                    <input type="text" name="firstname" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Last name</label>
                    <input type="text" name="lastname" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Email </label>
                    <input type="email" name="email" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Phone</label>
                    <input type="text" name="phone" />
                  </div>
                  <div className={styles.inputBox}>
                    <input
                      type="submit"
                      value="Send"
                      className={styles.button}
                    ></input>
                  </div>
                </form>
              </main>
            </div>
            <div className={styles.second}></div>
          </div>

          <footer className={styles.feed_footer}>
            <div className={styles.left_footer}>
              <h1>Rational CyberLabs</h1>
              <div className={styles.icons}>
                <FontAwesomeIcon className={styles.icon} icon={faFacebook} />
                <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
                <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
                <FontAwesomeIcon className={styles.icon} icon={faWhatsapp} />
              </div>
            </div>
            <div className={styles.right_footer}>
              <div className={styles.right_one}>
                <h3>Category</h3>
                <ul>
                  <li>link 1</li>
                  <li>link 1</li>
                  <li>link 1</li>
                </ul>
              </div>
              <div className={styles.right_two}>
                <h3>Category</h3>
                <ul>
                  <li>link 1</li>
                  <li>link 1</li>
                  <li>link 1</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

/*
 <div className={styles.animation_list}>
            <ul>
              <li>Revolutionize</li>
              <li>Unite</li>
              <li>Educate</li>
            </ul>
          </div>

        
*/
