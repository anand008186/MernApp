import React ,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import "../App.css" ;
import 'bootstrap-icons/font/bootstrap-icons.css';


const Register  = () => {
  const navigate  =  useNavigate() ;
  const [User ,setUser]  = useState({name: "" ,email : "" , phone: "",profession: "" ,password: "" }) ;

  let name ,value ;
  const Input = (e)=> {
    name = e.target.name;
    value = e.target.value;
   setUser({...User , [name] : value});
  
  }

  const postdata = async (e)=>{
    e.preventDefault();
    setUser({name:"" ,email :"" , phone:"",profession:"" ,password:""});
    const { name,email ,phone ,profession,password } = User ;
    console.log( name,email ,phone ,profession,password )
    console.log(JSON.stringify({name,email ,phone ,profession,password}));

     try {
      const res = await fetch("/register" , {
        method : "POST",
        headers:{
          "Content-Type":"application/json"
        } ,
        body : JSON.stringify({
          name,email ,phone ,profession,password
        })
      });
     console.log(res)
      const data = await res.json(); 
      console.log(data)
      if (res.status === 422  || !data ) {
       window.alert("invalid registration")
      }
      else
     {
     window.alert("registration successful");
     navigate('/login')
     }
   
     } catch (error) {
       console.log(error) ;
     }
  }


    return(
        <>
        <div className ="container text-center mt-5 ">

<form className = "well form-horizontal sign-up" style = {{"backgroundColor": "#DCDCDC"}}  method = "post"  id = "contact_form">
<fieldset>

{/* <!-- Form Name --> */}
<legend><center><h2 className  = "py-2" ><b>Registration Form</b></h2></center></legend><br/>

{/* <!-- Text input--> */}

<div className = "form-group row mb-2 mx-2">
<label className = "col-2 control-label">Name</label>  
<div className = "col-10 inputGroupContainer">
<div className = "input-group">
<span className = "input-group-addon"><i className = "glyphicon glyphicon-user"></i></span>
<input  name = "name" placeholder = "Name" className = "form-control rounded shadow-none"  type = "text" value = {User.name} onChange = {Input} />
</div>
</div>
</div>


{/* <!-- Text input--> */}
       <div className = "form-group row mb-2 mx-2">
  <label className = "col-2 control-label">E-Mail</label>  
    <div className = "col-10 inputGroupContainer">
    <div className = "input-group">
        <span className = "input-group-addon"><i className = "glyphicon glyphicon-envelope"></i></span>
  <input name = "email" placeholder = "E-Mail Address" className = "form-control rounded shadow-none"  type = "text" value = {User.email} onChange = {Input}/>
    </div>
  </div>
</div>

<div className = "form-group row mb-2 mx-2">
  <label className = "col-2 control-label">Contact No.</label>  
    <div className = "col-10 inputGroupContainer">
    <div className = "input-group">
        <span className = "input-group-addon"><i className = "glyphicon glyphicon-earphone"></i></span>
  <input name = "phone" placeholder = "+91" className = "form-control rounded shadow-none" type = "text" value = {User.phone} onChange = {Input}/>
    </div>
  </div>
</div>

{/* <!-- Text input--> */}
<div className = "form-group row mb-2 mx-2">
  <label className = "col-2 control-label">Profession</label>  
    <div className = "col-10 inputGroupContainer">
    <div className = "input-group">
        <span className = "input-group-addon"><i className = "glyphicon glyphicon-earphone"></i></span>
  <input name = "profession" placeholder = "profession" className = "form-control rounded shadow-none" type = "text" value = {User.profession} onChange = {Input}/>
    </div>
  </div>
</div>

<div className = "form-group row mb-2 mx-2">
  <label className = "col-2 control-label" >Password</label> 
    <div className = "col-10 inputGroupContainer">
    <div className = "input-group">
  <span className = "input-group-addon"><i className = "glyphicon glyphicon-user"></i></span>
  <input name = "password" placeholder = "Password" className = "form-control rounded shadow-none"  type = "password" value = {User.password} onChange = {Input}/>
    </div>
  </div>
</div>

<button type = "submit" value = "Submit" className = "btn btn-success btn-md " onClick = {postdata} >Submit</button>
</fieldset>
</form>
</div>


      
        
        
        
         </>)
}
export default Register