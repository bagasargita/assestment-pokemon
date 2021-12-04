import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import DashboardList from "./components/DashboardList";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="container">
      <div className="column">
        <Navbar />
      </div>
      <NavLink hidden to={"/product/search"}></NavLink>
      <div className="column">
        <div className="box">
          <Switch>
            <Route path={"/"} exact component={ProductList} />
            <Route path={"/product/:name"} component={Product} />
            <Route path={"/dashboard/:id"} component={Dashboard} />
            <Route path={"/dashboard"} component={DashboardList} />
            <Redirect to={"/"} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
