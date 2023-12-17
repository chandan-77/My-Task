import React, { useState } from 'react'
import axios from 'axios';
const Create = () => {

    const [task,setTask] = useState()
    const [description,setDescription] = useState()
    const handleSubmit = ()=>{
        axios.post('http://localhost:8080/add',{task:task,
        description:description})
        .then(result=> {
            console.log(result);
            location.reload();
         })
        .catch(err=> console.log(err))
    }
  return (
    <div className='my-form'>
    <div className='create_form'>
    <input type="text" name='task' id='' placeholder='enter the task' onChange={(e)=>setTask(e.target.value)}/>
    <input type="text" name='description'  placeholder='enter the description' onChange={(e)=>setDescription(e.target.value)}/>
    <button type='submit' onClick={handleSubmit}>Add</button>
</div>
    </div>

  )
}

export default Create