import React from 'react';
import Profile from './Profile';
import Content from './Content';
import { withAuth0 } from '@auth0/auth0-react';
import './App.css';




class App extends React.Component {
  render() {
    return (
      <>

        {this.props.auth0.isAuthenticated ? <Content/> : <Profile/>}
        
       
        </>)
  }
}

          export default withAuth0(App);
