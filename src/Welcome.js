import React from 'react';
import Alert from 'react-bootstrap/Alert'
import './Welcome.css';

class Welcome extends React.Component {
  render() {
    // console.log('welcome page is working');
    return (
      <Alert className="alert" variant="danger">
        Log In to Enter Playlist Maker
      </Alert>

    )
  }
}

export default Welcome;
