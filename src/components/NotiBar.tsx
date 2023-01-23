import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHook";

const NotiBar = () => {
  const noti = useAppSelector((state) => state.notification);
  const [content, setContent] = useState({ message: "", type: "" });
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (noti.length > 1) {
      setContent(noti[noti.length - 1]);
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
      }, 3000);
    }
  }, [noti]);

  // const onClose = () => {
  //   setDisplay(false);
  // };

  // const color = noti[0].type === "success" ? "teal" : "red";

  return display ? (
    <div className="notiBarSection">
      <p>{content.message || ""}</p>
    </div>
  ) : null;
};

export default NotiBar;
