import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieInfoPage from "./components/MovieInfoPage";
import SearchContextProvider from "./context/searchContext";
import SearchResultsPage from "./components/SearchResultsPage";

function App() {
  return (
    <SearchContextProvider>
      <div className="app">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movieinfo/:id" component={MovieInfoPage} />
            <Route path="/search" component={SearchResultsPage} />
            <Route path="/">
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "200px",
                }}
              >
                404! <br /> ERROR NOT FOUND!
              </h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </SearchContextProvider>
  );
}

export default App;
