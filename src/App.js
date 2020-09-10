import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Links } from "./pages/Links";
import { AddLink } from "./pages/AddLink";

function App() {
  return (
    <Router>
      <div>
        <div>
          <header>
            <div className="container">
              <h1 className="text-center">Challenge</h1>
            </div>
          </header>
        </div>

        <Switch>
          <Route path="/add-link">
            <AddLink />
          </Route>
          <Route path="">
            <Links />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
