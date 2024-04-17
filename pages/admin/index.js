import React, { use, useState, useEffect } from "react";
import style from "/styles/admin.module.css";
import SendData from "@/components/sendData";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
export default function test() {
  const navi = useRouter();
  const [adminData, setAdminData] = useState({
    admin_username: null,
    admin_password: null,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState("hello");

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const response = await SendData("/admin/login", adminData);
    setMessage(response.message);
    if (response.authType == 200) {
      navi.push("/admin/dashboard");
    }
  };

  const checkAdmin = () => {
    const adminAuth = getCookie("cyberLabs_Admin");
    if (adminAuth) {
      navi.push("/admin/dashboard");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className={style.login_container}>
      <div className={style.loginform}>
        <h2>Login</h2>
        <h3>{message}</h3>

        <form onSubmit={formHandler}>
          <p>Username</p>
          <input
            type="text"
            onChange={handleInput}
            required
            name="admin_username"
          />
          <p>Password</p>
          <input
            type="text"
            onChange={handleInput}
            required
            name="admin_password"
          />
          <input type="submit" name="login-btn" value="Login" />
        </form>
      </div>
    </div>
  );
}
