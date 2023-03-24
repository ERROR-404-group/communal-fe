import React from "react";
import './Profile.css';
import girl from './images/headphone-girl.jpg';
import LoginButton from './components/LoginButton';



const Profile = () => {


  return (
    <>
    <div className="landing-image">
   <ul className="list-of-notes">
    <li className="note">&#9834;</li>
    <li className="note">&#9835;</li>
    <li className="note">&#9833;</li>
   </ul>
   
   
    <img  src={girl} alt='a girl wearing headphones'/>
    </div>

    <div className="right-side">
    <h2>TuneTastic</h2>
    <p>With TuneTastic, you can easily browse through your music library and select your favorite songs, which can then be added to custom playlists that you create. </p>
    <LoginButton/>
    </div>
    </>
    )
};

export default Profile;
