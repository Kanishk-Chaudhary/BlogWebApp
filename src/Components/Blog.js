import classes from './Blog.module.css'
import { Route, useNavigate , Routes} from 'react-router';

import { useContext } from 'react';

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase ,ref , onValue , set, push , child,remove} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {useRef} from 'react';
import { Link } from 'react-router-dom';
import BlogPost from '../Pages/BlogPost';
import ListContext from '../Store/ListContext';




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





function Blog(props)
{
    const FvrtContext = useContext(ListContext);
    const isFvrt = FvrtContext.isFavorite(props.id);

  
    

    let user = auth.currentUser;

    if(user!==null)
    {

    const starCountRef = ref(firebaseDatabase, 'users/' + auth.currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      user = snapshot.val();
      

    });
    }


   
    
    
    const history = useNavigate();

    function ToggleFavorites()
    {

        

        //if blog not favorited before
                if(!isFvrt)
                {

                    FvrtContext.addFavorite({
                        id:props.id,
                        title:props.title,
                        image:props.image,
                        description:props.description,
                        body:props.body,
                        by:props.by

                    })
                    if(auth.currentUser!==null)
                    {

                    // set(ref(firebaseDatabase, 'users/' + auth.currentUser.uid), {
                    //    name: user.name,
                    //    uid: user.uid,
                    //    Favorites: user.Favorites +1 , 
                    //    blogsPublished: user.blogsPublished,
                    //    email: user.email
                    //   })

                    //  set(ref(firebaseDatabase, "users/" + auth.currentUser.uid + "/FavoriteBlogs/" + props.id), props)
                      
                     

                     set(ref(firebaseDatabase, "users/" + auth.currentUser.uid + "/FavoriteBlogs/"+props.id), props)
                     set(ref(firebaseDatabase,"users/" + auth.currentUser.uid+"/Favorites"),user.Favorites+1)

          
                    }
    }
    else
    {
        FvrtContext.removeFavorite(props.id);

        
        
        set(ref(firebaseDatabase, "users/" + auth.currentUser.uid + "/FavoriteBlogs/"+props.id),null )
        set(ref(firebaseDatabase,"users/" + auth.currentUser.uid+"/Favorites"),user.Favorites-1)



    }

    }

    let String = "Anonymous wrote this";
  if(  props.by)
  { 
        String = props.by + " wrote this";
  }

    return <div className = {classes.blog}>

    <img src = {props.image}></img>
    <h2>{props.title}</h2>
    <h4>{props.description}</h4>
    <p> {props.body}</p>
    
    <div className = {classes.buttonDiv}>
     
    <button onClick = {ToggleFavorites}>{isFvrt ? 'Remove From Favorites':'Add To Favorites'}</button>
    <h6> { String }</h6>
    
    </div>
    </div>

}
export default Blog;