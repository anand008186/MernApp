import React, { createContext , useReducer } from 'react';
import { Route , Routes} from 'react-router-dom';
import './App.css';
import Navbar from "./component/Navbar"
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Register from "./component/Register";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Errorpage from "./component/Error-page";
import { initialState , reducer } from './useReducer/Reducer';

// Context API
export const userContext = createContext();

const App = () => {
  
   const [state, dispatch] = useReducer(reducer, initialState) ;

  return (
    <>
     <userContext.Provider value={{state ,dispatch}}>
      <Navbar />
      <Routes>
           <Route path= "/"  element={ <Home />} />
           <Route  path="/about"  element={ <About />} />
           <Route  path="/contact" element={<Contact />} />
           <Route  path="/signUp" element={ <Register/> } />
           <Route  path="/login" element={  <Login />} />
           <Route  path="/logOut" element={  <Logout />} />
           <Route   element={  <Errorpage />} />
      </Routes>
      </userContext.Provider>
    
    
    
    
    
    </>
  
  );
}

export default App ;

