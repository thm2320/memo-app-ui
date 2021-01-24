import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../api/axios-memo';
import Person from '../../components/Person/Person';
import './MemoDetails.scss'
import { Button } from '../../components/UI/Button/Button'

export const MemoDetails = (props) => {
  const [memo, setMemo] = useState(null)
  const [linkPersons, setLinkPersons] = useState([])
  const { id } = useParams()

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const memoRes = await axios.post('/graphql', {
        query: `
        {
          memo(id:"${id}"){
            id
            title
            content
            creationDate
            updateDate
            personId
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
      const memo = memoRes.data.data.memo;
      setMemo(memo)
      const personRes = await axios.post('/graphql', {
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
      const linkedPersonIds = memo.persons.map((p) => p.id)
      const personsCanLink = personRes.data.data.person.filter((p) => {
        return memo.personId !== p.id && !linkedPersonIds.includes(p.id)
      })
      setLinkPersons(personsCanLink)
    }
    fetchData();


  }, [id])

  const linkPerson = async (personId, memoId) => {
    const res = await axios.post('/graphql', {
      query: `
      mutation{
        linkPerson(linkPersonInput:{
          personId:"${personId}"
          memoId:"${memoId}"
        })
        {
          linkId
        }
      }
      `
    })
    if (res) {
      history.go(0)
    }
  }

  return (
    <>
      <div className="MemoDetails">
        {memo ? (
          <>
            <h1>{memo.title}</h1>
            <p>{memo.content}</p>
            {memo.persons && memo.persons.length > 0 ? (
              <div className="memo-bottom">
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
          </>
        ) : null}

      </div>
      {
        linkPersons && linkPersons.length > 0 ? (
          <div className="LinkSection">
            <h2>Click to link person:</h2>
            <div className="can-link-persons">
              {
                linkPersons.map(p => {
                  return (
                    <Person
                      key={p.id}
                      displayName={p.displayName}
                      id={p.id}
                      clickHandler={() => { linkPerson(p.id, id) }}
                    />
                  )
                })
              }
            </div>
          </div>
        ) : null
      }
      <div style={{ marginTop: '1em' }}>
        <Button btnClickHandler={() => { history.go(-1) }} style={"normal"}>Return</Button>
      </div>
    </>
  );
}


