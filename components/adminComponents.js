import React, { useState, useEffect } from "react";
import GetData from "./getData";
import PlayList_Card from "./playlist-card";

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

  return (
    <div>
      {data.map((ele) => {
        return <li>{ele.uid}</li>;
      })}
    </div>
  );
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

  return (
    <div>
      {data.map((ele) => (
        <PlayList_Card playlist_data={ele} isAdmin={true} key={ele.id} />
      ))}
    </div>
  );
}
