import React, { useContext, useState } from "react";
import { useNavigate} from 'react-router-dom';
import "../App.css"
import {userContext} from "../App"

const Login  =() =>{

 const {state , dispatch} = useContext(userContext) ;

 const navigate = useNavigate();
 const [credential,setCredential]  = useState({email:"" ,password:""});
 
 const Input  =(e) =>{
     const {name,value}  = e.target ;
     setCredential({...credential , [name] : value})

 }
 const postdata  = async ( e )  =>{
    e.preventDefault();
    setCredential({email:"" ,password:""})
    const { email ,password }  = credential ;
    console.log(credential);
     const result  = await fetch('/login',{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body: JSON.stringify({email,password})
     })
   
     const data  = await result.json();

     if (result.status  === 422){
         
         window.alert("please fill email and password");
     }
     else if (result.status  === 201){
         dispatch({type: "USER" ,payload: true})
         window.alert("login successfully");
         navigate('/')
     }
     else if (result.status === 400 || !data) {
         window.alert("invalid credentials");
     }
 

 }



    return(
        <>
             <div className="container mt-5 ">
            <div className="login">LOGIN FORM</div>
            <div className="login-form">
                <form method="POST">
                    <div className="form-item">
                         <label htmlFor ="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="Email" value={credential.email} onChange={Input}/>
                    </div>
                    <div className="form-item">
                         <label htmlFor ="passWord">Password:</label> 
                        <input type="password" name="password" id="passWord" placeholder="Password" value={credential.password} onChange={Input}/>
                    </div>

                    <div className="form-btns">

                        <button type="submit" onClick={postdata}>Login</button>
                        <div className="options">
                            <a href="/register">Sign Up</a>
                
                        </div>


                    </div>
                </form>
                <p>Copyright &copy; MyCompany.com</p>
            </div>
        </div>
        
         </>)
}
export default Login