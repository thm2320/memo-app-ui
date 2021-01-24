import React from 'react';
import { useHistory } from 'react-router-dom';
import './Memo.scss'

export const Memo = (props) => {

  const history = useHistory();

  const showMemoDetails = () => {
    history.push(`/memo/${props.id}`)
  }

  return (
    <div className="Memo new" onClick={showMemoDetails}>
      {props.title}
    </div>
  );
}

