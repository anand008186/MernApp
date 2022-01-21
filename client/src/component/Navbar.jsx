import React , { useContext } from "react";
import { NavLink } from "react-router-dom";
import {userContext} from "../App";
const Navbar = ()=>{
  const {state } = useContext(userContext) ;
  const Menu = () => {
    if(state){
      return(<>
       <li className="nav-item me-4">
          <NavLink className="nav-link" to="/logOut">Logout</NavLink>
        </li>
        </>)
    }
    else {
      return(<>
      <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signUp">Registration</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
      </>)
    }
  }
    return(
        <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">LOGO</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
        <li className="nav-item me-4" >
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <Menu/>
       
      </ul>
    </div>
  </div>
</nav>

        </>
    );
}

export default Navbar;