import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Home from './view/home';
import NotFound from './view/notFound';
import Stats from "./view/stats";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
      <Router>
        <div>
          <Jumbotron >
            <Container>
              <h1>re.va</h1>
              <Nav className="justify-content-center" defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                  <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="/stats">Stats</Nav.Link>
                </Nav.Item>
              </Nav>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/stats">
                  <Stats/>
                </Route>
                <Route path="*">
                  <NotFound/>
                </Route>
              </Switch>
            </Container>
          </Jumbotron>
        </div>
      </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
export default App;
