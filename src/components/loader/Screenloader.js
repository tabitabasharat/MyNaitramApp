import React from "react";
import Lottie from "lottie-react";
import animationData from "./Animation - 1722521489122.json";

function ScreenLoader({ text }) {
  return (
    <div
      style={{
        zIndex: 999999999999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.2)",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 500, height: 500 }}
        />
        <h2 className="text-white mt-5">{text}</h2>
      </div>
    </div>
  );
}

export default ScreenLoader;
