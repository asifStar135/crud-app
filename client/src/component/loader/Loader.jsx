import React from "react";
import loaderImg from "./loader.gif"
import "./loader.css"

const Loader = () => {
  return (
    <>
      <div className="loader">
        <img src="https://icons8.com/preloaders/preloaders/1490/Rhombus.gif" alt="loading...." />
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export default Loader;
