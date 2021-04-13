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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/MovieInfo">
            <MovieInfoPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
