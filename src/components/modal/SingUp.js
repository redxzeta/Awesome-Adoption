import React from "react";
import ReactDOM from "react-dom";

import "./singUp.css";

export default function SingUp({ isOpen, setIsOpen }) {
  const modalRoot = document.getElementById("modal-root");

  console.log(isOpen);
  if (isOpen) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className="modal-container">
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>,
      modalRoot
    );
  }
}

function handleOnSubmit(e) {
  e.preventDefault();
  console.log("Submited");
}

function Modal({ isOpen, setIsOpen }) {
  return (
    <>
      <div id="iconSingUp" onClick={() => setIsOpen(!isOpen)}>
        X
      </div>
      <h2>Sing Up</h2>
      <form onSubmit={(e) => handleOnSubmit(e)} className="form-container">
        <label htmlFor="text">Name :</label>
        <input type="text" id="name" />
        <label htmlFor="lastname">Lastname :</label>
        <input type="text" id="lastname" />
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password :</label>
        <input type="password" id="password" />
        <button type="submit" className="custom-btn btn-11">
          Submit
        </button>
      </form>
    </>
  );
}
