import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [input,setInput]=useState({
    username:"",
    email:"",
    password:""
  });

  const handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input , [name]:value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/register',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
      
      })
      console.log("registration from" ,response)
      const res_data = await response.json()  
      
      if(response.ok){
        console.log("response from server" ,res_data)
        setInput({username:"" , email:"",password:""})
        alert("Registration successful")
        navigate("/login")
      }
      else{
        console.log("response from server" ,res_data)
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
            <h1>Register here</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={input.username} onChange={handleInput} placeholder='Enter your name' autoComplete='off'/><br/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={input.email} onChange={handleInput} placeholder='Enter your email' autoComplete='off'/><br/>

        <label htmlFor="password">Password</label>
        <input type="text" name="password" value={input.password} onChange={handleInput} placeholder='Enter your password' autoComplete='off'/><br/><br/>

        <button type="submit">Sign UP</button>
        </form>
    </div>
  )
}

export default Register;
