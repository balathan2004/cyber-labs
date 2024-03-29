import React, { useEffect } from "react";

export default function Notification({ notify, setNotify }) {
  useEffect(() => {
    setTimeout(() => {
      setNotify(null);
    }, 5000);
  }, [notify]);

  return (
    <div className="notification">
      <span>{notify}</span>
    </div>
  );
}
