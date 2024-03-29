import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/forall.css";

export const Userphoto = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
