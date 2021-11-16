import { Link } from "react-router-dom";
import classes from './NavigationBar.module.css'

function NavigationBar()
{

    return (

        <header className = {classes.header}>
            
            <nav> 
              

            <div className = {classes.logo}> Blog It </div>

                <ul>
                
                    <li>
                        <Link to = '/Profile'>Profile</Link>
                    </li>

                    <li>
                        <Link to = "/News">News</Link>
                    </li>

                    <li>
                        <Link to = '/List' >Favorites</Link>
                    </li>
                
                    <li>
                        <Link to = '/' >Wall</Link>
                    </li>

                   

                    <li>
                        <Link to = "/Add">+</Link>
                    </li>

            
             </ul>

            </nav>
        
        </header>
   
   );
    
}

export default NavigationBar;