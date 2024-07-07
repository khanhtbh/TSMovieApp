import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MovieStore} from 'n-movie-sdk';
import HomeScreen from './HomeScreen';
import MovieDetailScreen from './MovieDetailScreen';

const Stack = createNativeStackNavigator();

const movieStore = new MovieStore();
export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{title: 'Home'}}>
            {props => <HomeScreen {...props} movieStore={movieStore} />}
          </Stack.Screen>
          <Stack.Screen name="MovieDetail" options={{title: 'Movie Detail'}}>
            {props => (
              <MovieDetailScreen
                {...props}
                movieStore={movieStore}
                movie={props.route.params.movie}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
