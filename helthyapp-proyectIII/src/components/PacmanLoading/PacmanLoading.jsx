import React from "react";
import "./PacmanLoading.css";
import { PacmanLoader } from "react-spinners";
const PacmanLoading = () => {
  return (
    <div className="PacmanLoading">
      <div className="center">
        <PacmanLoader color="#83A580" />
      </div>
    </div>
  );
};

export default PacmanLoading;
