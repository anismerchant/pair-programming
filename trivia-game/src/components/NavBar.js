import React, { Component } from 'react';
// import Anime from 'react-anime';

class NavBar extends Component {

    render() {
        return (
            <div className="navigation">
                <h1 className = "navigation--heading"> – Trivia – </h1>
                {/* <div className="navigation--container-for-image">
                    <img className = "navigation--image" src="./assets/images/nav-background.png" alt="Navigation Background Cover" />
                </div> */}
            </div>
        )
    }
}

export default NavBar;