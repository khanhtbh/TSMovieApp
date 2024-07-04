import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MovieStore from '../../stores/MovieStore';
import SearchStore from '../../stores/SearchStore';

const Stack = createNativeStackNavigator();

const movieStore = new MovieStore();
const searchStore = new SearchStore();
export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{title: 'Home'}}>
            {props => (
              <HomeScreen
                {...props}
                movieStore={movieStore}
                searchStore={searchStore}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
