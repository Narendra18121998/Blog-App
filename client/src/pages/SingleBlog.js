import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
const SingleBlog = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const[blog,setBlog]=useState({});

  useEffect(()=>{
    const fetchSingleBlog = async()=>{
      const response = await fetch(`http://localhost:5000/api/get/blog/${id}`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log("response from single blog" , response)
            const res_data = await response.json();
            if(response.ok){
                console.log("response from server",res_data)
                setBlog(res_data)
            }
            else{
                alert(res_data.message)
            }
    }
    fetchSingleBlog();
  },[id])

  return (
    <>
    <div className="card" style={{width: "18rem"}}>
    <img src={`http://localhost:5000/${blog.thumbnail}`} className="card-img-top" alt="..." />
    <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.description}</p>
        <button onClick={()=>navigate("/")} class="btn btn-primary">Back to Post</button>
    </div> 
    </div>
    </>
  )
}

export default SingleBlog