import classes from "../Components/Profile.module.css";

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase ,ref , onValue} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import LoginSignup from "./LoginSignup";



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




function Profile()
{

  
 
  
  
 
let user = "CHECK BACK SOON";



   

    
  
  if(auth.currentUser === null)
  {
    return (<LoginSignup></LoginSignup>)
  }
  else
  {
    
    const starCountRef = ref(firebaseDatabase, 'users/' + auth.currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      user= snapshot.val();
      



   

    });




    
  return(
    <section>
      
     <h1>Profile</h1>
     
     <div className = {classes.profile}>
     <img src = "https://via.placeholder.com/150/1856cd"></img>
     <h2>Name - {user.name}</h2>
     <h3>Email - {user.email}</h3>
     <h4>UserId - {user.uid}</h4>
     <h5>Number of Favorites - {user.Favorites}</h5>
     <h5>Blogs Published - {user.blogsPublished}</h5>
     

     </div>
      
   </section>
  )
  }
}

export default Profile;