import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="btn rounded-circle shadow-lg back-icon"
      onClick={() => {if(window.history.length > 1) {navigate(-1)} else {navigate("/")}}}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}
