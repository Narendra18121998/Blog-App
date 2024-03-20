import { useEffect,useState } from "react";
import { Link } from "react-router-dom"
const Home = () => {
  const[blogs,setBlogs]=useState([]);
  useEffect(()=>{
    const fetchAllBlogs = async()=>{
      const response = await fetch('http://localhost:5000/api/get/allblogs',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log("response from get all blogs" , response)
      const res_data = await response.json()
      if(response.ok){
        console.log("reponse from server" , res_data)
        setBlogs(res_data)
      }
    }
    fetchAllBlogs();
  },[])
  return (
    <>
    <div className="heading">
      <h1 className="text-center">Latest posts</h1>
    </div>
    {
      blogs && blogs.length>0 ? blogs.map((curBlog)=>{
        return (
          <>
          <div className="card" style={{width: "18rem"}}>
          <img src={`http://localhost:5000/${curBlog.thumbnail}`} className="card-img-top" alt="..." />
          <div className="card-body">
        <h5 className="card-title">{curBlog.title}</h5>
        <p className="card-text">{curBlog.description}</p>
        <Link to={`/blog/${curBlog._id}`} class="btn btn-primary">Read more</Link>
    </div> 
    </div>
          </>
        )
      }):<h1>No Blog has been Added..</h1>
    }
   
    </>
  )
}

export default Home;
