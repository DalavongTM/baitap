import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Add } from './Add';
import DocList from './DocList';

// const data = [
//   { id: 1, name: 'Trồng rau', isComplete: true },
//   { id: 2, name: 'Nuôi gà', isComplete: false },
// ];
const Home = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    try {
      loadData();
    } catch (err) {
      alert('error', err);
    }
  });
  const loadData = async () => {
    const res = await fetch('http://localhost:5001/api/task');
    const data = await res.json();
    setData(data.ac);
  };
  const setCompleted = async (_id) => {
    var doc = data.find((doc) => doc._id === _id);
    //var docList = this.state.data.filter((doc) => doc.id !== id);
    console.log('set complete', doc);
    let isComplete = !doc.isComplete;
    try {
      const data = await fetch(
        `http://localhost:5001/api/task/isComplete/${_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isComplete,
          }),
        }
      );
      history.push('/home');
    } catch (err) {
      alert('error update');
    }
  };
  const add = async (name) => {
    let isComplete = false;
    try {
      const data = await fetch('http://localhost:5001/api/task', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          isComplete,
        }),
      });
      const resData = await data.json();
      history.push('/home');
    } catch (err) {
      alert('Something wrong add!', err);
    }
  };
  const edit = async (name, _id) => {
    try {
      const data = await fetch(`http://localhost:5001/api/task/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      });
      history.push('/home');
    } catch (err) {
      alert('error update');
    }
  };

  const deleteItem = async (_id) => {
    try {
      const data = await fetch(`http://localhost:5001/api/task/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      alert('error delete');
    }
  };

  console.log('dada', data);
  const docList = data.filter((i) => !i.isComplete);
  const docListComplete = data.filter((doc) => doc.isComplete);

  return (
    <>
      <Add add={add}> </Add>
      <HomeWrapper>
        <DocList
          text='Công việc'
          docs={docList}
          setCompleted={setCompleted}
          editdoc={edit}
        ></DocList>
        <DocList
          text='Công việc hoàn thành'
          completed
          docs={docListComplete}
          setCompleted={setCompleted}
          editdoc={edit}
          deleteItem={deleteItem}
        ></DocList>
      </HomeWrapper>
    </>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin: 1.5rem 0;
`;
