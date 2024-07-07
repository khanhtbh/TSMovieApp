// screens/HomeScreen.tsx
import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import MovieStore from '../../stores/MovieStore';
import MovieCard from '../components/MovieCard';
import {Movie} from '../../models/Movie';

interface HomeState {
  searchInput: string;
}

interface HomeProps {
  movieStore: MovieStore;
}

@inject('movieStore')
@observer
export default class HomeScreen extends Component<HomeProps, HomeState> {
  constructor(props: {movieStore: MovieStore}) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      searchInput: '',
    };
  }

  componentDidMount() {
    this.props.movieStore.fetchMovies();
  }

  onRefresh() {
    if (this.props.movieStore.isLoading) {
      return;
    }
    if (this.state.searchInput.length === 0) {
      this.props.movieStore.fetchMovies();
    } else {
      this.handleSearch(this.state.searchInput);
    }
  }

  handleSearch(text: string) {
    console.log('searching' + text);
    this.setState({searchInput: text});
    this.props.movieStore.search(this.state.searchInput);
  }

  handlePress(movie: Movie) {
    this.props.navigation.navigate('MovieDetail', {
      movie: movie,
      title: movie.title,
    });
  }

  render() {
    const {movieStore} = this.props;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search for movies..."
          value={this.state.searchInput}
          onChangeText={this.handleSearch}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.inputContainer}
          round
        />

        <FlatList
          data={
            movieStore.searchResults.length > 0
              ? movieStore.searchResults
              : movieStore.movies
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MovieCard movie={item} onPress={() => this.handlePress(item)} />
          )}
          refreshing={movieStore.isLoading}
          onRefresh={() => this.onRefresh()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  listContainer: {
    padding: 10,
  },
});
