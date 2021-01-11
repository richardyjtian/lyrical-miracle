import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <App />
          </Route>
          <Route path="/callback">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}