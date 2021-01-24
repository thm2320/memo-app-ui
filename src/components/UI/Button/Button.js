import React from 'react';
import './Button.scss';

export const Button = (props) => (
  <button
    className={`Button ${props.type ? props.type : ""}`}
    onClick={props.btnClickHandler}
  >
    {props.children}
  </button>
);



