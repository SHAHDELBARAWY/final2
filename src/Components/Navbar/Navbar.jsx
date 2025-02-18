import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../../Context/UserContext'


export default function Navbar (){
let navigate = useNavigate();
let {counter }= useContext(CounterContext);
let {userLogin , setUserLogin} =useContext(UserContext);

function logOut (){
  localStorage.removeItem('userToken');
  setUserLogin(null);
  navigate('/login')
}


return(
  <>
<nav className={`navbar navbar-expand-lg bg-light sticky-top top-0 left-0 right-0`}>
 <div className="container ">
    <i className={`fa-solid fa-cart-shopping nav-icon ${styles.icon}`}></i>
    <a className={`navbar-brand ${styles.font}`} href="#">fresh cart</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
        
        {userLogin !== null? <>
          <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Cart">cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Wishlist">wish list</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Brands">brands</NavLink>
        </li>

        </>:null}
      </ul>

      <div className='flex mx-auto me-0'>
      <ul className='navbar-nav '>
        {userLogin === null? <>

        <li className="nav-item">
          <NavLink className="nav-link" to="Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Register">register</NavLink>
        </li>
        </>: 
        <>
        <li className="nav-item">
        <NavLink className="nav-link" to="/cart">
        <i className={`fa-solid fa-cart-shopping nav-icon text-black ${styles.icon}`}></i> {counter}
        </NavLink>
        </li>
        <li className="nav-item" onClick={logOut}>
          <NavLink className="nav-link cursor-pointer">Logout</NavLink>
        </li>
        </>
        }
    
      </ul>
      </div>
    </div>
  </div>
</nav>
    </>
)}
