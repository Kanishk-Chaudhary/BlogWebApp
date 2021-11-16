import classes from '../Components/AddBlog.module.css';
import {useRef} from 'react';
import App from '../App';
import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase ,ref , onValue , set} from "firebase/database";
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


function AddBlog()
{
    const history = useNavigate();

    const imageReference = useRef();
    const titleReference = useRef();
    const descriptionReference = useRef();
    const bodyReference = useRef();
     

    function submitHandler(event)
    {
        event.preventDefault();
        
        const imageValue = imageReference.current.value;
        const titleValue = titleReference.current.value;
        const descriptionValue = descriptionReference.current.value;
        const bodyValue = bodyReference.current.value;


        let user = "";

        if(auth.currentUser)
        {
            // update blogs published 

            

const starCountRef = ref(firebaseDatabase, 'users/' + auth.currentUser.uid);
onValue(starCountRef, (snapshot) => {
  user = snapshot.val();
  
});


            set(ref(firebaseDatabase, 'users/' + auth.currentUser.uid), {
               name: user.name,
               uid: user.uid,
               Favorites: user.Favorites,
               blogsPublished: user.blogsPublished +1,
               email: user.email
              });

        }
        

    fetch(
        "https://react-blog-3c025-default-rtdb.firebaseio.com/posts.json" , 
        {
            method: 'POST' , 
            body : JSON.stringify({image: imageValue , title : titleValue , description: descriptionValue ,body:bodyValue,by:user.name}),
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        
        ).then(() => {
            history("/");
        })

        
 .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);

    // ..
  })
}

    return (
        <div>
            <h1>
                 Writing is the best way to talk without being interrupted ~ Jules Renard
            </h1>

            <form className = {classes.control} onSubmit = {submitHandler}>

           <h2 className = {classes.h2}>Add Blog</h2> 

            <div>
            <label htmlFor = "Image"> Blog Image Url </label>
            <input type="url" required id = "Image" ref = {imageReference} />

            </div>

            <div>
            <label htmlFor = "title"> Blog Title </label>
            <input type="text" required id = "title" ref ={titleReference}/>

            </div>

            <div>
            <label htmlFor = "title"> Blog Description </label>
            <input type="text" required id = "title" ref ={descriptionReference}/>

            </div>

            
            <label htmlFor = "Body"> Blog Body </label>
            <textarea type = "text" required id = "Body" required rows = "10" ref = {bodyReference}></textarea>

            <div className = {classes.actions}>

            <button >Add Blog</button>
            </div>

           



            </form>
        </div>


    );

}

export default AddBlog;
