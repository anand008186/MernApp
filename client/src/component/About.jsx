import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import profile from   "../Images/profile.jpg"

const About  = () => {
  const navigate = useNavigate();
  const [userData , setuserData] = useState({})
  const callAbout = async () =>{
    try {
      const response = await fetch('/about' , {
          method: 'GET' ,
          headers:{
              Accept: "application/json" ,
              'Content-Type' : "application/json" 
          } ,
          credentials : "include"
      })

      var data = await response.json();


      setuserData(data) ;
      if( ! response.status === 200){
          const error = new Error(response.error);
          throw error;
      }

  } catch (error) {
      console.log(error) ;
      navigate("/login") ;
  }
}  
  
    useEffect( () => {
       callAbout();
    } ,[] );
    return(
     <>
       <div className = "container mt-3 ">
           <form method = "GET" className   =  "about">
               <div className   =  "row mt-3 ms-5">
                   <img src = {profile} alt = "" className = "img-fluid col-4  "  />
                   <div className = "profile col-6 px-4 d-flex flex-column justify-content-between">
                      <div>
                      <h5>{userData.name}</h5>
                       <h6>{userData.profession}</h6>
                      </div> 
                      <div>
                      <ul className = "nav nav-tabs mb-0" role = "tablist">
                         <li className = "nav-item">
                           <a className = "nav-link active" id = "home-tab" data-bs-toggle = "tab" href = "#home" role = "tab" aria-controls = "home" >About</a>
                         </li>
                          <li className = "nav-item">
                            <a className = "nav-link" id = "profile-tab" data-bs-toggle = "tab" href = "#profile" role = "tab" aria-controls = "home" >Timeline</a>
                          </li>
                     </ul>
                      </div>
                     
                   </div>
                   <div className = "col-2">
                       <input type = "submit" value = "edit profile" />
                   </div>
                </div>
                
                <div className = "tab-content profile-tab mt-5 about-info  " id = "myTabContent">
                    <div className = "tab-pane container  active  " id = "home" role = "tabpanel" aria-labelledby = "home-tab">
                    <div className = "row about-secondary py-2 justify-content-center ">
                       <div className = "col-4 ">
                         <label >Name</label>
                     </div>
                     <div className = "col-4 text-secondary ">{userData.name}</div>
                     </div>
                     <div className = "row mb-2 py-2 justify-content-center">
                     <div className = "col-4">
                         <label >Email</label>
                     </div>
                     <div className = "col-4 text-secondary">{userData.email}</div>
                     </div>
                     
                     <div className = "row mb-2  py-2 justify-content-center">
                     <div className = "col-4">
                         <label >Contact no.</label>
                         </div>
                     <div className = "col-4 text-secondary">{userData.phone}</div>
                     </div>
                    
                     <div className = "row mb-2 py-2  justify-content-center">
                     <div className = "col-4">
                         <label >Profession</label>
                         </div>
                     <div className = "col-4 text-secondary">{userData.profession}</div>
                     </div>
                    
                   </div>
                   <div className = "tab-pane container fade " id = "profile" role = "tabpanel" aria-labelledby = "profile-tab">
                   <div className = "row  py-2 justify-content-center ">
                       <div className = "col-4 ">
                         <label >Experience</label>
                     </div>
                     <div className = "col-4  text-secondary">expert</div>
                     </div>
                     <div className = "row mb-2 py-2 justify-content-center">
                     <div className = "col-4">
                         <label >Degree</label>
                     </div>
                     <div className = "col-4 text-secondary">B.tech</div>
                     </div>
                     
                     <div className = "row mb-2  py-2 justify-content-center">
                     <div className = "col-4">
                         <label >Hobbies</label>
                         </div>
                     <div className = "col-4 text-secondary">trader/atheletics/reader </div>
                     </div>
                    
                     <div className = "row mb-2 py-2  justify-content-center">
                     <div className = "col-4">
                         <label >Projects</label>
                         </div>
                     <div className = "col-4 text-secondary">5</div>
                     </div>
                   </div>

                </div>  
           </form>
       </div>
        
        
        
         </>)
}
export default About ;