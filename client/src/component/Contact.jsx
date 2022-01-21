import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact  = () =>{
    
    const [userData , setuserData] = useState({name:"" ,email:"",phone : "",subject : "",messsage : ""})
    const userContact = async () =>{
      try {
        const response = await fetch('/getData' , {
            method: 'GET' ,
            headers:{
                 
                'Content-Type' : "application/json" 
            } ,
        })
  
        var data = await response.json();
  
  
        setuserData({...userData , name : data.name ,email : data.email, phone : data.phone }) ;
        if( ! response.status === 200){
            const error = new Error(response.error);
            throw error;
        }
  
    } catch (error) {
        console.log(error) ;
        
    }
  }  
    
      useEffect( () => {
         userContact();
      } ,[] );

      const eventHandler = (e) => {
           const {name,value} = e.target ;
           setuserData({...userData , [name] : value})
      } ;
// SEND THE DATA TO BACKEND
const postdata = async (e)=>{
    e.preventDefault();
    const { name,email ,phone ,subject, message } = userData ;

     try {
      const res = await fetch("/contact" , {
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        } ,
        body : JSON.stringify({
          name,email , phone , subject ,message 
        })
      });
    
      const data = await res.json();
      if ( !data ) {
       window.alert("MESSAGE NOT SENT") ;
      }
      else if (res.status === 422){
        window.alert("Please fill the contact form properly ")
      }
      else
     {
     window.alert("MESSAGE SENT");
     setuserData({...userData ,subject: "" , message: "" })
     }
   
     } catch (error) {
       console.log(error) ;
     }
  }
    return(
        <>
       <section className = "ftco-section">
<div className = "container">
<div className = "row justify-content-center">
<div className = "col-12 text-center mb-5">
<h2 className = "heading-section">Get in touch</h2>
</div>
</div>
<div className = "row justify-content-center">
<div className  = "col-md-10">
<div className  = "wrapper">
<div className  = "row no-gutters">
<div className = "col-md-6">
<div className = "contact-wrap w-100 p-lg-5 p-4">
<h3 className = "mb-4">Send us a message</h3>
<form method = "GET" id = "contactForm" name = "contactForm" className = "contactForm">
<div className = "row">
<div className = "col-md-12 mb-2">
<div className = "form-group">
<input type = "text" className = "form-control shadow-none" name = "name" id = "name" placeholder = "Name" value={userData.name} onChange={eventHandler}/>
</div>
</div>
<div className = "col-md-12 mb-2">
<div className = "form-group">
<input type = "email" className = "form-control shadow-none" name = "email" id = "email" placeholder = "Email" value={userData.email} onChange={eventHandler}/>
</div>
</div>
<div className = "col-md-12 mb-2">
<div className = "form-group">
<input type = "text" className = "form-control shadow-none" name = "subject" id = "subject" placeholder = "Subject" value={userData.subject} onChange={eventHandler}/>
</div>
</div>
<div className = "col-md-12 mb-2">
<div className = "form-group">
<textarea name = "message" className = "form-control shadow-none" id = "message" cols = "30" rows = "6" placeholder = "Message" value = {userData.message} onChange={eventHandler} ></textarea>
</div>
</div>
<div className = "col-md-12 mb-2">
<div className = "form-group">
<button type = "submit"  className = "btn btn-primary" onClick={postdata}>Send Message</button>
<div className = "submitting"></div>
</div>
</div>
</div>
</form>
</div>
</div>
<div className = "col-md-6 d-flex align-items-stretch">
<div className = "info-wrap w-100 p-lg-5 p-4 img">
<h3>Contact us</h3>
<p className = "mb-4">We're open for any suggestion or just to have a chat</p>
<div className = "dbox w-100 d-flex align-items-start">
<div className = "icon d-flex align-items-center justify-content-center">
<span className = "fa fa-map-marker"></span>
</div>
<div className = "text pl-3">
<p><span>Address:</span>RKB ,Village area near MAC IIT Roorkee</p>
</div>
</div>
<div className = "dbox w-100 d-flex align-items-center">
<div className = "icon d-flex align-items-center justify-content-center">
<span className = "fa fa-phone"></span>
</div>
<div className = "text pl-3">
<p><span>Phone:</span> <a href = "tel://1234567920">{userData.phone}</a></p>
</div>
</div>
<div className = "dbox w-100 d-flex align-items-center">
<div className = "icon d-flex align-items-center justify-content-center">
<span className = "fa fa-paper-plane"></span>
</div>
<div className = "text pl-3">
<p><span>Email:</span> <a href = "/cdn-cgi/l/email-protection#254c4b434a655c4a5057564c51400b464a48"><span className = "__cf_email__" data-cfemail = "acc5c2cac3ecd5c3d9dedfc5d8c982cfc3c1">[email&#160;protected]</span></a></p>
</div>
</div>
<div className = "dbox w-100 d-flex align-items-center">
<div className = "icon d-flex align-items-center justify-content-center">
<span className = "fa fa-globe"></span>
</div>
<div className = "text pl-3">
<p><span>Website</span> <a href = "#">yoursite.com</a></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
        
         </>)
}
export default Contact