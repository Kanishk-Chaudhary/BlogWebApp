import NavigationBar from "../Components/NavigationBar";

function BlogPost(props)
{

        return (


            <div>
                <NavigationBar />
                <img src = {props.url}></img>
                <h2>{props.title}</h2>
                <p>{props.title}</p>
                
            </div>


        );


}

export default BlogPost;