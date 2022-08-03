import React, { Component } from "react";
import Header from "../component/Header";
import Plan from "../component/Plan";

class PlanHome extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <Plan />
      </div>
    );
  }
}

export default PlanHome;
