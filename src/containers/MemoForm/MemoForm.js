import axios from '../../api/axios-memo';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import './MemoForm.scss';

export const MemoForm = () => {

  const [fields, setFields] = useState({
    title: '',
    content: '',
  });

  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const btnClickHandler = async (evt) => {
    evt.preventDefault();
    const { title, content } = fields;

    const res = await axios.post('/graphql', {
      query: `
      mutation{
        createMemo(createMemoInput:{
          title:"${title}",
          content:"${content}"
          personId:"${query.get('owner')}"
        })
        {
          id
          content
          title          
        }
      }
      `
    })
    if (res) {
      history.push(`/memos/${query.get('owner')}`)
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
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={fields.title}
        onChange={onInputChange}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        value={fields.content}
        onChange={onInputChange}
      />
      <Button btnClickHandler={btnClickHandler}>Create New Memo</Button>

    </form>
  );
}


