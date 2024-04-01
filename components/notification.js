import React, { useEffect } from "react";
import { Alert } from "@mui/material";

export default function Notification({ notify, setNotify }) {
  useEffect(() => {
    console.log("popped notification");
    setTimeout(() => {
      setNotify(null);
    }, 5000);
  }, [notify]);

  return (
    <div className="notification">
      <Alert variant="filled" severity="info">
        {notify}
      </Alert>
    </div>
  );
}
