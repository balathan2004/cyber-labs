import React, { Component, useState, useEffect } from "react";
import style from "/styles/admin.module.css";
export default function Admin() {
  const [currentState, setCurrentState] = useState(null);

  const handleContent = (name) => {
    console.log(name);
  };

  return (
    <div className="container">
      <main className={style.admin}>
        <header>
          <ul>
            <li
              onClick={() => handleContent("user")}
              name="user"
              className={style.active}
            >
              Users
            </li>
            <li onClick={() => handleContent("playlist")} name="playlist">
              Playlists
            </li>
            <li onClick={() => handleContent("create")} name="create">
              Create
            </li>
          </ul>
        </header>
        <article></article>
        <footer></footer>
      </main>
    </div>
  );
}
