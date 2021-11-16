

import { Route,Routes } from 'react-router-dom';


import Wall from './Pages/Wall';
import List from './Pages/List';
import Profile from './Pages/Profile';
import News from './Pages/News';
import AddBlog from './Pages/AddBlog';
import Signup from './Pages/Signup';
import LoginSignup from './Pages/LoginSignup';
import NavigationBar from './Components/NavigationBar';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyCRWO5700zFVDvmKtqb6qBz1dPd2tfmE64",
  authDomain: "react-blog-3c025.firebaseapp.com",
  databaseURL: "https://react-blog-3c025-default-rtdb.firebaseio.com",
  projectId: "react-blog-3c025",
  storageBucket: "react-blog-3c025.appspot.com",
  messagingSenderId: "1046511499213",
  appId: "1:1046511499213:web:404f9310daaf9f66c1f684",
  measurementId: "G-NX9LMWVJ8V"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseDatabase = getDatabase(app);
const auth = getAuth();

// Initialize Firebase

function ProfileToggle()
{
 <Profile></Profile>

}



function App() {
  return (
   
    <div>
       <NavigationBar />

      <Routes>

      <Route path = "/" element = { <Wall />} > </Route>

      <Route path = "/List" element = {<List />}> </Route> 

      <Route path = "/Profile" element = {
        
      
      
         <Profile></Profile>
            
    


      }> </Route> 

      <Route path = "/News" element = {<News />}> </Route>

      <Route path = "/Add" element = {<AddBlog />}></Route>

      <Route path = "/Signup" element = {<Signup/>}></Route>

      <Route path = "/login" element = {<LoginSignup/>}></Route>

      </Routes>

    </div>
    

  
  );
}

export default App;
