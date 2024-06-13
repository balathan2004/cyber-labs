import React, { Component, useState, useEffect } from "react";
import style from "/styles/admin.module.css";
import {
  UsersAdminComponent,
  PlayListAdminComponent,
} from "@/components/adminComponents";
export default function Admin() {
  const [currentState, setCurrentState] = useState(true);

  const handleContent = (name) => {
    setCurrentState((prev) => !prev);
  };

  return (
    <div className="pad_container">
      <main className={style.admin}>
        <header>
          <ul>
            <li
              className={currentState ? style.active : null}
              onClick={() => handleContent("playlist")}
              name="playlist"
            >
              Playlists
            </li>
            <li
              onClick={() => handleContent("user")}
              name="user"
              className={!currentState ? style.active : null}
            >
              Users
            </li>
            <li>
              <a href="/admin/courses">Courses</a>
            </li>
          </ul>
        </header>
        <article>
          {currentState ? <PlayListAdminComponent /> : <UsersAdminComponent />}
        </article>
        <footer></footer>
      </main>
    </div>
  );
}
