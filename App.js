/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Text } from 'react-native';
import LoginScreen from './src/screens/Login';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';

global.apiConfig = {
    appID: '775ca81b',
    appKey: '1a2e21f2dd03a3a007529aa2001a1276',
    apiURL: 'https://api.nutritionix.com/v1_1/',
    searchAPI: (phrase) => apiURL + 'search/' + phrase + '?' + 'appId=' + appID + '&appKey=' + appKey + '&',
    itemAPI: () => apiURL + 'item?' + 'appId=' + appID + '&appKey=' + appKey + '&',
    brandAPI: (brandID) => apiURL + 'brand/' + brandID + '?' + 'appId=' + appID + '&appKey=' + appKey + '&',
    brandSearchAPI: () => apiURL + 'brand/search?' + 'appId=' + appID + '&appKey=' + appKey + '&'
}
const MainNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen, path: 'Login', navigationOptions: {
            header: null,
        }
    },
    Main: {
        screen: MainScreen,
        navigationOptions: {
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: "#0ff"
            },
            headerTitle: "Main Screen",
            header: null
        }
    }
}, {
    initialRouteName: 'Login'
});

const App = createAppContainer(MainNavigator);

export default App;

console.disableYellowBox = true; 