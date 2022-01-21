import React , {useState ,useEffect} from "react";

const Home =()=>{
    const [userName , setuserName] = useState("")
    const userHome = async () =>{
      try {
        const response = await fetch('/getData' , {
            method: 'GET' ,
            headers:{
                 
                'Content-Type' : "application/json" 
            } ,
        })
  
        var data = await response.json();
  
  
        setuserName(data.name ) ;
        if( ! response.status === 200){
            const error = new Error(response.error);
            throw error;
        }
  
    } catch (error) {
        console.log(error) ;
    }
  }  
    
      useEffect( () => {
         userHome();
      } ,[] );
    return(
        <>
        <div className=" justify-content-center home-page">
        <h3>WELCOME</h3>
        <h1>{userName}</h1>
        <h4> {(userName === "")?"We are the Mern Developer" : "Happy to see you"} </h4> 
        </div>
       
        
        
        
        
         </>)
}
export default Home