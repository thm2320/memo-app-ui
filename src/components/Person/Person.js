import React from 'react';
import { useHistory } from 'react-router-dom';
import './Person.scss'

const Person = (props) => {

  const history = useHistory();

  const showMemos = () => {
    history.push(`/memos/${props.id}`)
  }

  return (
    <div className="Person" onClick={props.clickHandler ? props.clickHandler : showMemos}>
      {props.displayName}
    </div>
  );
}

export default Person;

