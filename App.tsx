import React, {Component} from 'react';
import Navigation from './src/view/screens/Navigation';
import {NMovieSDK, NmSDKConfigs} from 'n-movie-sdk';
import {RandomMovieKeywords} from './src/data/movie-data';

const sdkConfig: NmSDKConfigs = {
  api_key: null,
  movieStoreObservable: true,
  randomMovieKeywords: RandomMovieKeywords,
};

NMovieSDK.config(sdkConfig);

export default class App extends Component {
  render() {
    return <Navigation />;
  }
}
