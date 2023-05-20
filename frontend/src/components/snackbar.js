import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  return (
    <div
      className="fixed -translate-x-2/4 -translate-y-0 w-[350px] h-[60px] flex items-center text-center rounded-lg left-2/4 top-[5%]"
      id={showSnackbar ? "show" : "hide"}
      style={{
        backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
        color: "black",
      }}
    >
      <div className="flex-[10%]">
        {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="flex-[80%] text-start font-bold">{props.message}</div>
    </div>
  );
});

export default Snackbar;
