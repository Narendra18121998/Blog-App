import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const[input,setInput]=useState({
    email:"",
    password:""
  })

  const handleInput=(e)=>{
    const name = e.target.name
    const value = e.target.value

    setInput({
      ...input,[name]:value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
      })
      console.log("login form" , response)
      const res_data = await response.json()
      if(response.ok){
        console.log("reponse from server" , res_data)
        localStorage.setItem("token" ,res_data.token)
        localStorage.setItem("username",res_data.username)
        setInput({email:"", password:""})
        alert("Login Successful")
        navigate("/")
      }
      else{
        console.log('repsonse from server', res_data)
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
            <h1>Log into Your Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={input.email} onChange={handleInput} placeholder='Enter your email' autoComplete="off"/><br/>

        <label htmlFor="password">Password</label>
        <input type="text" name="password" value={input.password} onChange={handleInput} placeholder='Enter your password' autoComplete="off"/><br/><br/>

        <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;
