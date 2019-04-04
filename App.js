import React, { Component } from "react";
import { Main } from "./app/config/router";
import StoriesStore from "./app/store/storiesStore";

export default class App extends Component {
  componentDidMount() {
    StoriesStore.getStories();
  }

  render() {
    return <Main />;
  }
}
