import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate= useNavigate();
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    alert("Logout Successful")
    navigate("/login")
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <Link className="navbar-brand" to="#">BlogApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="add-blog">Add Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="add-category">Add Category</Link>
        </li>
      </ul>
      <div className='div-inline mx-auto my-2 my-lg-0'>
      {token && token!=null ? 
      <>
        <button className='btn btn-primary'>welcome {username}</button>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
      </>
        :
        <>
        <Link to="/login"><button className='btn btn-primary'>Login</button></Link>
        <Link to="/register"><button className='btn btn-primary'>Register</button></Link>
        </>
      }
      </div>
      </div>
  </div>
</nav>
    </>
  )
}

export default Header;
