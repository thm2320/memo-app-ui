import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios-memo';

import Person from '../../components/Person/Person';
import './PersonList.scss';
import { Button } from '../../components/UI/Button/Button';

const PersonList = (props) => {
  const [persons, setPersons] = useState([])

  const history = useHistory();

  useEffect(() => {
    axios.post('/graphql', {
      query: `
      {
        person
        {
          id
          displayName
          creationDate
          updateDate
        }
      }
      `
    })
      .then((res) => {
        setPersons(res.data.data.person.sort((a, b) => { return a.displayName <= b.displayName ? -1 : 1 }))
      })

  }, [])

  const openPersonForm = () => {
    history.push('/person')
  }

  return (
    <div className="PersonList">
      <h1>Person List</h1>
      <div className="button-bar">
        <Button btnClickHandler={openPersonForm}>Create Person</Button>
      </div>
      <p>Click on the Person to check his/her memos:</p>
      {
        persons.map(p => {
          return (
            <Person
              key={p.id}
              displayName={p.displayName}
              id={p.id}
            />
          )
        })
      }
    </div>
  );
}

export default PersonList;

