import React from 'react';
import './Button.scss';

export const Button = (props) => (
  <button
    className={`Button ${props.style ? props.style : ""}`}
    onClick={props.btnClickHandler}
  >
    {props.children}
  </button>
);



