import React from 'react';
import About from './About';
import Profile from './Profile';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogOutButton';
import { withAuth0 } from '@auth0/auth0-react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <>
        {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/>}
        {this.props.auth0.isAuthenticated ? <Content/> : <Profile/>}
        </>)
  }
}

          export default withAuth0(App);
