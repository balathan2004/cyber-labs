import React, { useState, useEffect } from "react";
import GetData from "./getData";

export function UsersAdminComponent() {
  const [data, setData] = useState([]);

  const fetchData = async function () {
    const userData = await GetData("/admin/get_users");
    setData(userData.message);
    console.log(userData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Hello</div>;
}

export function PlayListAdminComponent() {
  const [data, setData] = useState([]);

  const fetchData = async function () {
    const userData = await GetData("/get_playlist");
    setData(userData.data);
    console.log(userData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Hello</div>;
}
