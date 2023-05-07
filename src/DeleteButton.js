import React from "react";
import './Table.css'

const DeleteButton = ({ id, onClick }) => {
  return (
    <button className="button table-button" onClick={() => onClick(id)}><img className="img" src="delete.svg"/><span className="span invis">Удалить</span></button>
  );
};

export default DeleteButton;