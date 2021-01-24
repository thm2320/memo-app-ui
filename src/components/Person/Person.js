import React from 'react';
import { useHistory } from 'react-router-dom';
import './Person.scss'

const Person = (props) => {

  const history = useHistory();

  const showMemos = () => {
    history.push(`/memos/${props.id}/${props.displayName}`)
  }

  const getClickFn = () => {
    return props.clickHandler ? props.clickHandler : showMemos
  }

  return (
    <div
      className={`Person ${props.showRemoveButton ? 'removeable' : ''}`}
      onClick={props.showRemoveButton ? null : getClickFn()}>
      <p>{props.displayName}</p>
      {props.showRemoveButton ? (
        <button onClick={props.showRemoveButton ? getClickFn() : null}>&times;</button>
      ) : null}
    </div>
  );
}

export default Person;

