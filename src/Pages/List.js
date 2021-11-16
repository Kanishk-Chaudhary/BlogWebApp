import {useContext} from 'react';
import ListContext from '../Store/ListContext';
import Blog from '../Components/Blog';
import classes from '../Components/AddBlog.module.css';
import {useRef} from 'react';
import App from '../App';
import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { getDatabase ,ref , onValue , set} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useState ,useEffect } from 'react';



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


function List()
{

    let [isLoading , setIsLoading] = useState(false);
    let [blogsLoaded , setBlogsLoaded] = useState([]);
    let userId = auth.currentUser;
    
            if(userId == null)
             {  
                userId ="";
             }
             else
             {
                 userId = auth.currentUser.uid;
             }
      
      useEffect(() => {
        
        
        fetch(
          "https://react-blog-3c025-default-rtdb.firebaseio.com/users/"+ userId +"/FavoriteBlogs.json")
         .then(response => {
          return response.json();
         }).then(data => {
      
          setIsLoading = false;
            const blogs = [];
      
            for(const keys in data){
      
              const blogger = {
                ...data[keys]
              }
              blogs.push(blogger);
            }
      
      
           setBlogsLoaded(blogs);
           
          })
      
      }, []);


    //   return   <section>

    //     <h1>My Favorites</h1>
    //     <div>
    //      {
    //             blogsLoaded.reverse().favorites.reverse().map(blog => { 
    //                 return <Blog url = {blog.image} title = {blog.title} description = {blog.description} body = {blog.body} by = {blog.by} id = {blog.id}></Blog>
    //              })
                 
    //              }

            


    //     </div>
        

    // </section>



   
    let favoritesCtx = useContext(ListContext)

    if(userId !== "") // user is logged in 
    {
        let NotzeroBlogsinFirebase = true;
       
        const starCountRef = ref(firebaseDatabase, 'users/' + userId);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(data.FavoriteBlogs !== null)
  {
        NotzeroBlogsinFirebase = false;
  }
  

});
        
        if((favoritesCtx.favorites.length === 0)&& (NotzeroBlogsinFirebase))
        {
            
            favoritesCtx.favorites = blogsLoaded;
        }

        // alert("blogsLoaded "+ blogsLoaded.length)
    
        // alert("favorites " + favoritesCtx.favorites.length)
        
    }
    
    


    return   <section>

        <h1>My Favorites</h1>
        <div>
         {
                favoritesCtx.favorites.reverse().map(blog => { 
                    return <Blog url = {blog.image} title = {blog.title} description = {blog.description} body = {blog.body} by = {blog.by} id = {blog.id}></Blog>
                 })
                 
                 }

            


        </div>
        

    </section>
    

}

export default List;
