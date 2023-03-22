import React from 'react';
import { Component } from "react";
import './About.css';

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>

        <h2>Creators</h2>
        <section id="about-profile-container">
          <section className="section">
            <img className="profileImage" src="" alt="" />
            <p>Name: </p>
            <p>Title: Full Stack Developer</p>
            <p>Location: Seattle, WA</p>
          </section>
          <section className="section">
          <img className="profileImage" src="" alt="" />
          <p>Name: </p>
          <p>Title: Full Stack Developer</p>
          <p>Location: Seattle, WA</p>
        </section>
      </section>
      </>
    )
  }
};

export default Profile;
