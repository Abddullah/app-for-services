
import React, { Component } from 'react';
import MainNavigator from "./router"
import Store from './src/store';
import { Provider } from 'react-redux';

export default class App extends Component {
  componentWillMount() {
    console.disableYellowBox = true
  }
  render() {
    return (
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    )
  }
}
