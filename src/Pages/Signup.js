import classes from '../Components/AddBlog.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';




import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase , ref ,set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {useRef} from 'react';
import Wall from './Wall';



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





function Signup()
{
   const history = useNavigate();

    const nameReference = useRef();
    const emailReference = useRef();
    const passwordReference = useRef();

    function submitHandler(event)
    {
        event.preventDefault();
        
        const nameValue = nameReference.current.value;
        const emailValue = emailReference.current.value;
        const passwordValue = passwordReference.current.value;


        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
         
          const user = userCredential.user;
      
       
        set(ref(firebaseDatabase, "users/" + user.uid), 

        {uid: auth.currentUser.uid , name : nameValue , email: emailValue , blogsPublished : 0 , Favorites : 0}
           
          ).then(() => {
                history("/");
            })



        })
          

       
   

//     fetch(
//         "https://react-blog-3c025-default-rtdb.firebaseio.com/users/"+ auth.currentUser.uid + ".json" , 
//         {
//             method: 'POST' , 
//             body : JSON.stringify({uid: auth.currentUser.uid , name : nameValue , email: emailValue , blogsPublished : 0 , Favorites : 0}),
//             headers:{
//                 'Content-Type' : 'application/json'
//             }
//         }
        
//         );

        
//   }).then(() => {
//     history("/");
// }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     alert(errorMessage);

//     // ..
//   })

    }

    return (

        <div className = {classes.login}>
                <form className = {classes.control} onSubmit = {submitHandler}>
            <h2>Signup</h2>
            
            <div>
            <label htmlFor = "name"> Username</label>
            <input type="text" required id = "name" ref = {nameReference}/>

            </div>

            <div>
            <label htmlFor = "email"> Email</label>
            <input type="text" required id = "email" ref = {emailReference}/>

            </div>

            <div>
            <label htmlFor = "password"> Password</label>
            <input type="password" required id = "password" ref = {passwordReference}/>

            </div>
            
            <div className = {classes.actions}>
            
            
           <button>Sign up</button>
           
            </div>

            <Link to = "/Profile">
            
            Already a user ? Login 

            </Link>

            </form>


        </div>
    );

}

export default Signup