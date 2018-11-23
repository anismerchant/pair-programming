import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
 
    
    render() {
        return (
            <div className="navigation">
                <Link className = "trivia-game--nav-links" to={`/`}>
                    <h1 className = "navigation--heading">Trivia</h1>
                </Link>
            </div>
        )
    }
}


export default NavBar;