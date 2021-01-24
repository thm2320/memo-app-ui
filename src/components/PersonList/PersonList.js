import axios from '../../api/axios-memo';
import React, { useEffect, useState } from 'react';
import Person from '../Person/Person';
import './PersonList.scss';

const PersonList = (props) => {
  const [persons, setPersons] = useState([])

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
        setPersons(res.data.data.person)
      })

  }, [])

  return (
    <div className="PersonList">
      <h1>Person List</h1>
      {
        persons.map(p => {
          return <Person key={p.id} displayName={p.displayName} />
        })
      }
    </div>
  );
}

export default PersonList;

