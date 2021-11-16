import Blog from "../Components/Blog";
import classes from '../Components/Blog.module.css';
import { useState, useEffect } from "react";


function Wall()
{
  let [isLoading , setIsLoading] = useState(false);
  let [blogsLoaded , setBlogsLoaded] = useState([]);


useEffect(() => {
  
  
  fetch(
    "https://react-blog-3c025-default-rtdb.firebaseio.com/posts.json")
   .then(response => {
    return response.json();
   }).then(data => {

    setIsLoading = false;
      const blogs = [];

      for(const keys in data){

        const blogger = {
          id: keys,
          ...data[keys]
        }
        blogs.push(blogger);
      }


     setBlogsLoaded(blogs);
     
    }) 

}, []);

  

    if(isLoading)
    {
      return <section>
        <h1>Loading...</h1>
      </section>
    }

    return   (
    
    <div>
       <h1>Either write something worth reading or do something worth writing ~ Benjamin Franklin</h1>
       <div className ={classes.display}>
        {

        blogsLoaded.reverse().map(blog => { 
            return <Blog image = {blog.image} title = {blog.title} description = {blog.description} body = {blog.body} by = {blog.by} id = {blog.id}></Blog>
         })}
        
    </div>
    </div>
       
       ); 
       

}

export default Wall;
