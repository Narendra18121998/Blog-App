import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
    const navigate=useNavigate();
    const[input,setInput]=useState({
        title:"",
        description:"",
        category:""
    })
    const[file,setFile]=useState([]);
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
        const fetchAllCategories = async()=>{
            const response = await fetch('http://localhost:5000/api/get/categories',{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("reponse from all categories" , response)
            const res_data = await response.json()
            console.log(res_data)
            setCategories(res_data)
        }
        fetchAllCategories();
    },[])

    const handleInput=(e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput({
            ...input,[name]:value
        })
    }

    const handleFile=(e)=>{
        //console.log(e.target.files)
        setFile(e.target.files[0])
    }

    //creating a Form Data
    const formdata = new FormData();
    formdata.append("title",input.title)
    formdata.append("category",input.category)
    formdata.append("description",input.description)
    formdata.append("thumbnail",file)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/add/blog',{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
                body:formdata //passing the form data object directly
            })
            console.log("response from add blog" , response)
            const  res_data = await response.json();
            if(response.ok){
                console.log("response from server",res_data)
                alert("blog added successfully")
                setInput({title:"",description:"",category:""})
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
            <h1>Add a New Blog</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label><br/>
        <input type="text" name="title" value={input.title} onChange={handleInput} placeholder='Enter Title'/><br/>

        <label htmlFor="category">Category</label><br/>
        <select name="category"  onChange={handleInput}>
            <option>Select Category</option>
            {categories && categories.map((curEle)=>{
                return <option value={curEle._id}>{curEle.title}</option>
            })}
        </select><br/>
        
        <label htmlFor="description">Description</label><br/>
        <textarea type="text" name="description" value={input.description} onChange={handleInput} placeholder='Enter Description'/><br/>

        <label htmlFor="thumbnail">Thumbnail</label><br/>
        <input type="file" name="thumbnail" onChange={handleFile} placeholder='select Thumbnail'/><br/><br/>

        <button type='submit' className='btn btn-primary'>Add Blog</button>
        </form>
    </div>
    )
}

export default AddBlog