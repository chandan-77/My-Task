import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import {BsCircleFill,BsFillTrashFill,BsCheckCircleFill,} from 'react-icons/bs'
import { CiEdit } from "react-icons/ci";

const Home = () => {
    const [todos,setTodos] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [updatedTask, setUpdatedTask] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:8080/records')
        .then(result => {setTodos(result.data)
        // location.reload()
    })
        .catch(err=>console.log(err))
    },[])

    const handleStatus = (id)=>{
       axios.put('http://localhost:8080/status/'+id)
       .then(result => {console.log(result)
       location.reload()
        })
       .catch(err => console.log(err))
    }

    const handleDelete=(id)=>{
        axios.delete('http://localhost:8080/delete/'+id)
        .then(result => {
        location.reload()
         })
        .catch(err => console.log(err))
    }


    const handleEdit = (id) => {
        setIsEditing(true);
        setEditId(id);
        const editedItem = todos.find((todo) => todo._id === id);
        setUpdatedTask(editedItem.task);
        setUpdatedDescription(editedItem.description);
      };


      const handleUpdate = () => {
        axios.put(`http://localhost:8080/edit/${editId}`, {
          task: updatedTask,
          description: updatedDescription,
        })
          .then((result) => {
            console.log(result);
            setIsEditing(false);
            setEditId(null);
            location.reload();
          })
          .catch((err) => console.log(err));
      };
    

  return (
    <div className="home">
    <h2>Task management</h2>
    <Create />
    {todos.length === 0 ? (
      <div>
        <h2>No record</h2>
      </div>
    ) : (
      todos.map((todo) => (
        <div className="task" key={todo._id}>
          {isEditing && editId === todo._id ? (
            <div >
              <input
                type="text"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
              />
              <input
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <BsCheckCircleFill
                className="icon"
                onClick={handleUpdate}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ) : (
            <div className="checkbox" onClick={() => handleStatus(todo._id)}>
              {todo.status ? (
                <BsCheckCircleFill />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.status ? 'line_through' : ''}>{todo.task}</p>
              <p className={todo.status ? 'line_through' : ''}>
                {todo.description}
              </p>
            </div>
          )}
          <div>
            <span>
              <CiEdit
                className="icon"
                onClick={() => handleEdit(todo._id)}
                style={{ cursor: 'pointer' }}
              />
            </span>
          </div>
          <div>
            <span>
              <BsFillTrashFill
                className="icon"
                onClick={() => handleDelete(todo._id)}
                style={{ cursor: 'pointer' }}
              />
            </span>
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default Home