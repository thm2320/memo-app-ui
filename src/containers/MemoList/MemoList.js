import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../api/axios-memo';

import { Memo } from '../../components/Memo/Memo';
import './MemoList.scss';
import { Button } from '../../components/UI/Button/Button';

export const MemoList = (props) => {
  const [memos, setMemos] = useState([])
  const { personId } = useParams()

  const history = useHistory();

  useEffect(() => {
    axios.post('/graphql', {
      query: `
      {
        listMemo(listMemoInput:{
          personId:"${personId}"
          limit:25
          offset:0
        }){
          id
          title          
        }
      }
      `
    })
      .then((res) => {
        setMemos(res.data.data.listMemo)
      })

  }, [personId])

  const openMemoForm = () => {
    history.push('/memo')
  }

  return (
    <div className="MemoList">
      <h1>Memo List</h1>
      <div className="button-bar">
        <Button btnClickHandler={openMemoForm}>Create Memo</Button>
      </div>
      <p>Click on the Memo to check details:</p>
      {
        memos.map(m => {
          return <Memo key={m.id} {...m} />
        })
      }
    </div>
  );
}


