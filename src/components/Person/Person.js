import React from 'react';
import './Person.scss'

const Person = (props) => {

  return (
    <div className="Person">
      {props.displayName}
    </div>
  );
}

export default Person;

