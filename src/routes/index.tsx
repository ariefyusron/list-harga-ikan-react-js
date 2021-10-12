import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// screens
import Home from "../pages/Home";
import Create from "../pages/Create";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/create" exact>
        <Create />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
