import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../api/axios-memo';
import Person from '../../components/Person/Person';
import './MemoDetails.scss'

export const MemoDetails = (props) => {
  const [memo, setMemo] = useState(null)
  const { id } = useParams()

  const history = useHistory();

  useEffect(() => {

    axios.post('/graphql', {
      query: `
      {
        memo(id:"${id}"){
          id
          title
          content
          creationDate
          updateDate
          persons {
            id
            displayName
            creationDate
            updateDate
          }
        }
      }
      `
    })
      .then((res) => {
        setMemo(res.data.data.memo)
      })

  }, [id])

  return (
    <div className="MemoDetails">
      {memo ? (
        <div>
          <h1>{memo.title}</h1>
          <p>{memo.content}</p>
          <h2>Linked Persons:</h2>
          <div className="linked-persons">
            {
              memo.persons.map(p => {
                return <Person
                  key={p.id}
                  displayName={p.displayName}
                  id={p.id}
                />
              })
            }
          </div>
        </div>
      ) : null}

    </div>
  );
}


