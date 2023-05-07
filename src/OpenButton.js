import React from "react";
import './Table.css'
import { Link } from "react-router-dom";
import "./Links.css"

const OpenButton = ({ id, type }) => {
  return (
  <button className="button table-button">
    {type === "reports" ? (
      <Link className="link link-button" to={`/reports/${id}`}>
        <img className="img" src="open.svg" />
        <span className="span invis">Открыть</span>
      </Link>
    ) : (
    <Link className="link link-button" to={`/officers/${id}`}>
      <img className="img" src="open.svg" />
      <span className="span invis">Открыть</span>
    </Link>
  )}
  </button>
  );
};

export default OpenButton;