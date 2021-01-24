import axios from '../../api/axios-memo';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import './MemoForm.scss';

export const MemoForm = () => {

  const [fields, setFields] = useState({
    title: '',
    content: '',
  });

  const query = new URLSearchParams(useLocation().search);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios.post('/graphql', {
        query: `
          {
            memo(id:"${id}"){
              id
              title
              content           
            }
          }
          `
      })
        .then((res) => {
          const { title, content } = res.data.data.memo
          setFields({
            title, content
          })
        })
    }

  }, [])

  const createMemo = async (evt) => {
    evt.preventDefault();
    const { title, content } = fields;

    const res = await axios.post('/graphql', {
      query: `
      mutation{
        createMemo(createMemoInput:{
          title:"${title}",
          content:"${content}",
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
      // history.push(`/memos/${query.get('owner')}`)
      history.go(-1)
    }
  }

  const updateMemo = async (evt) => {
    evt.preventDefault();
    const { title, content } = fields;

    const res = await axios.post('/graphql', {
      query: `
      mutation{
        updateMemo(updateMemoInput:{
          id:"${id}",
          title:"${title}",
          content:"${content}"
        })
        {
          id
          title
          content
        }
      }
      `
    })
    if (res) {
      history.go(-1)
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

  const goPrevPage = (evt) => {
    evt.preventDefault();
    history.goBack();
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
      <div>

        <Button btnClickHandler={id ? updateMemo : createMemo}>{id ? "Update Memo" : "Create New Memo"}</Button>
        <Button btnClickHandler={goPrevPage} type='normal'>Return</Button>
      </div>

    </form>
  );
}


