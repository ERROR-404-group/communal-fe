import React from 'react';
import About from './About';
import Profile from './Profile';
import Content from './Content';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <>
          <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={
              <Content />
            }
            ></Route>
            <Route
              exact path="/about"
              element={<About />}
            >
            </Route>
            <Route
              exact path="/profile"
              element={
                <Profile />
            }
            >
            </Route>
          </Routes>
          <Footer />
        </Router>

      </>
    )
  }
}

export default App;
