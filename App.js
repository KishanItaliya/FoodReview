import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'

const MainNavigator = createStackNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignIn: { screen: SigninScreen },
    SignUp: { screen: SignupScreen },
    Home: { screen: HomeScreen }
  },
  {
    //launcher screen
    initialRouteName: "Loading"
  }
)

//create app container
const App = createAppContainer(MainNavigator);
export default App;
