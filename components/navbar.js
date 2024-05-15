import React, { useContext, useState, useEffect } from "react";
import { NavBarProvider } from "@/pages/_app";
import Link from "next/link";
import styles from "/styles/nav.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isLogin, setIsLogin] = useContext(NavBarProvider);
  const [inputValue, setInputValue] = useState(false);
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

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event) => {
    setInputValue(event.target.checked);
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div>
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
                  <Link href={x.route}>{x.title}</Link>
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
    </div>
  );
}
