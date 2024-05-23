import React, { useContext, useState, useEffect } from "react";
import { NavBarProvider } from "@/pages/_app";
import Link from "next/link";
import styles from "/styles/Home.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);
  const [inputValue, setInputValue] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const currentRoute = useRouter().asPath.replace("/", "");

  const NavRoutes = [
    {
      title: "contact",
      route: "/contact",
    },
    {
      title: "about",
      route: "/about",
    },

    {
      title: "courses",
      route: "/courses",
    },
    { title: isLogin, route: `/${isLogin}` },
  ];

  const hideMenu = () => {
    setShowMenu(false);
  };

  const setInput = (event) => {
    setInputValue(event.target.checked);
  };

  const showMenuBox = () => {
    setShowMenu(true);
    console.log("cliecke");
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <nav className={styles.nav}>
      <a href="index.html">
        <img src="./images/logo.jpg" alt="" />
      </a>
      <div
        className={showMenu ? styles.nav_links_show : styles.nav_links}
        id="navLinks"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.icons_xmark}
          onClick={hideMenu}
        ></FontAwesomeIcon>
        <ul>
          <li>
            <a href="./index.html">HOME</a>
          </li>
          <li>
            <a href="./about.html">ABOUT</a>
          </li>
          <li>
            <a href="./course.html">COURSE</a>
          </li>
          <li>
            <a href="./blog.html">BLOG</a>
          </li>
          <li>
            <a href="./contact.html">CONTACT</a>
          </li>
          <li>
            <a href="./login.html">LOGIN</a>
          </li>
        </ul>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className={styles.icons_bar}
        onClick={showMenuBox}
      ></FontAwesomeIcon>
    </nav>
  );
}

/*

<nav className={styles.nav}>
      <input
        className={styles.input}
        type="checkbox"
        id="check"
        onChange={setInput}
        checked={inputValue}
      ></input>
      <label htmlFor="check" className={styles.checkbtn}>
        <FontAwesomeIcon icon={faBars} />
      </label>
      <a href="/" className={styles.brand}>
        Rational Cyberlabs
      </a>

      <ul className={styles.uls}>
        {NavRoutes.map((x) => {
          if (x.title != currentRoute) {
            return (
              <li key={x.route} id={x.route}>
                <Link href={x.route} onClick={changeInput}>
                  {x.title}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={x.route} id={x.route}>
                <Link href={x.route} className={styles.active}>
                  {x.title}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
*/
