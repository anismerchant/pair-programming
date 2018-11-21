import React, { Component } from 'react';
//import anime from 'animejs';

class NavBar extends Component {

    render() {
        // anime({
        //     targets: '#svgAttributes polygon',
        //     points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
        //     easing: 'easeInOutExpo'
        //   });
          
        return (
            <div className="navigation">
                {/* <div  id="#svgAttributes">
                
                    <svg width="128" height="128" viewBox="0 0 128 128">
                        <polygon points="64 69.05540296656274 8.574 99.97200788635023 63.062004184952315 67.43031034624397 64 3.9720078863502195 64.93799581504769 67.43031034624397 119.426 99.97200788635023 " fill="currentColor"></polygon>
                    </svg>
                </div> */}
                <h1 className = "navigation--heading"> – Trivia – </h1>
                <div className="navigation--container-for-image">
                    <img className = "navigation--image" src="./assets/images/nav-background.png" alt="Navigation Background Cover" />
                </div>
            </div>
        )
    }
}

export default NavBar;