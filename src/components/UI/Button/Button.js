import React from 'react';
import './Button.scss';

export const Button = (props) => (
  <button
    className="Button"
    onClick={props.btnClickHandler}
  >
    {props.children}
  </button>
);



