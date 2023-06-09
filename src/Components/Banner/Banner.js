import React from "react";

function Banner() {
    return (
        <div>
            <header>
                <b>Welcome to the West Taghkanic Diner!</b>
            </header>
            <h2 className="textBox">A retro diner featuring locally sourced ingredients, house smoked meats, and fresh baked pastries.</h2>
            <img id='bannerDinerImage' src={require ('../dinerPics/dinerCoverPhoto.jpeg')} alt='diner' />
        </div>
    )
}

export default Banner;