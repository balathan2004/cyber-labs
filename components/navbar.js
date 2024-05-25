import React, { useContext, useState, useEffect } from "react";
import { NavBarProvider } from "@/pages/_app";
import Link from "next/link";
import styles from "/styles/Home.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);

  const [showMenu, setShowMenu] = useState(false);
  const currentRoute = useRouter().asPath;

  const NavRoutes = [
    { title: "Home", route: "/" },
    {
      title: "about",
      route: "/about",
    },
    {
      title: "courses",
      route: "/courses",
    },
    {
      title: "blog",
      route: "/blog",
    },
    {
      title: "contact",
      route: "/contact",
    },

    { title: isLogin, route: `/${isLogin}` },
  ];

  const hideMenu = () => {
    setShowMenu(false);
  };

  const showMenuBox = () => {
    setShowMenu(true);
  };

  return (
    <nav className={currentRoute == "/" ? styles.nav : styles.nav_right}>
      {currentRoute == "/" ? (
        <a href="index.html">
          <img src="./images/logo.jpg" alt="" />
        </a>
      ) : null}

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
          {NavRoutes.map((route, index) => {
            return (
              <li key={index}>
                <a href={route.route}>{route.title}</a>
              </li>
            );
          })}
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
