import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
  const navigate=useNavigate();
  const[input,setInput]=useState({
    title:""
  });

const handleInput=(e)=>{
  const name = e.target.name;
  const value = e.target.value;
  setInput({
    ...input,[name]:value
  })
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/add/category',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(input)
    })
    console.log("Add Category" , response)
    const res_data = await response.json()
    if(response.ok){
      console.log("response from server" , res_data)
      setInput({title:""})
      alert("Category added successfully")
      navigate('/')
    }
    else{
      alert(res_data.message)
    }
  } 
  catch (error) {
    console.log(error)  
  }
}
  return (
    <div className='container'>
        <div className='heading'>
            <h1>Add a New Category</h1>
        </div>

        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label><br/>
        <input type="text" name="title" value={input.title} onChange={handleInput} placeholder='Enter Title'/><br/><br/>

        <button type='submit' className='btn btn-primary'>Add Category</button>
        </form>
    </div>
  )
}

export default AddCategory