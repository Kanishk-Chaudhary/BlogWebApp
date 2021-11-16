import classes from '../Components/News.module.css';


function News()
{
    return (
    <div>

        <h1>News</h1>

       

        <div className = {classes.div}>
        <h2> November 13th </h2>
        <ul>
            <li>
                Seach Feature coming soon
            </li>
        
                <li>
                    Interacting with other users coming soon

                </li>

                <li>
                   View Each BlogPosts separately feature coming soon

                </li>
                <li>
                  LocalStorage coming soon ( avoid refreshing where possible)

                </li>

        </ul>
        </div>

    </div>);

}
export default News;