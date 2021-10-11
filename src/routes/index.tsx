import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// screens
import Home from "../pages/Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
