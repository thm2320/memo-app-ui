import axios from '../../api/axios-memo';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import './PersonForm.scss';

export const PersonForm = () => {

  const [fields, setFields] = useState({
    displayName: '',
  });

  const history = useHistory();

  const createPersonHandler = async (evt) => {
    evt.preventDefault();
    const { displayName } = fields;

    const res = await axios.post('/graphql', {
      query: `
      mutation{
        createPerson(createPersonInput:{
          displayName:"${displayName}"
        })
        {
          id
          displayName
          creationDate
        }
      }
      `
    })
    if (res) {
      history.push('/');
    }
  }

  const onInputChange = (evt) => {
    const input = evt.target;
    const updatedFields = {
      ...fields,
      [input.name]: input.value
    }
    setFields(updatedFields);
  }


  return (
    <form className="PersonForm">
      <label htmlFor="displayName">Display Name</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        value={fields.displayName}
        onChange={onInputChange}
      />
      <div className="button-bar">
        <Button btnClickHandler={createPersonHandler}>Create New Person</Button>
        <Button btnClickHandler={() => { history.push('/') }} style={"normal"}>Return</Button>
      </div>

    </form >
  );
}


