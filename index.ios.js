/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux'
import store from './js/store/store';
import Navigator from './js/navigator/nav';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Navigator />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('Qcblog', () => App);
