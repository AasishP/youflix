import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieInfoPage from "./components/MovieInfoPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/youflix" component={Home} />
          <Route exact path="/youflix/movieinfo/:id" component={MovieInfoPage} />
          <Route path="/">
            <h1 style={
              {
                textAlign:'center',
                marginTop:'200px'
              }
            }>404! <br /> ERROR NOT FOUND!</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
