import { Link } from 'react-router-dom';
import classes from '../Components/AddBlog.module.css';


import { useNavigate } from 'react-router';




import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
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




function LoginSignup()
{


    const history = useNavigate();

    const nameReference = useRef();
    const emailReference = useRef();
    const passwordReference = useRef();

    function submitHandler(event)
    {
        event.preventDefault();
        
        const emailValue = emailReference.current.value;
        const passwordValue = passwordReference.current.value;

        signInWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
   
    const user = userCredential.user;
        
  }).then(() => {
    history("/");
}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);

    // ..
  })

    }

    return (

        <div className = {classes.login}>
                <form className = {classes.control} onSubmit = {submitHandler}>
           <h2>Login</h2> 
            

            <div>
            <label htmlFor = "email"> Email</label>
            <input type="text" required id = "email" ref = {emailReference}/>

            </div>

            <div>
            <label htmlFor = "password"> Password</label>
            <input type="password" required id = "password" ref = {passwordReference}/>

            </div>
            <div className = {classes.actions}>

            <button>Log-in</button>
            </div>

            <Link to = "/SignUp">
            
            New here ? Sign Up !
            </Link>

            </form>


        </div>
    );

}

export default LoginSignup;