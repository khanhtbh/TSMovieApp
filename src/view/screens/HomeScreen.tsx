// screens/HomeScreen.tsx
import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import MovieStore from '../../stores/MovieStore';
import SearchStore from '../../stores/SearchStore';
import MovieCard from '../components/MovieCard';

interface HomeState {
  searchInput: string;
}

interface HomeProps {
  movieStore: MovieStore;
  searchStore: SearchStore;
}

@inject('movieStore', 'searchStore')
@observer
export default class HomeScreen extends Component<HomeProps, HomeState> {
  constructor(props: {movieStore: MovieStore; searchStore: SearchStore}) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchInput: '',
    };
  }

  componentDidMount() {
    this.props.movieStore.fetchMovies();
  }

  handleSearch(text: string) {
    console.log('searching' + text);
    this.props.searchStore.setSearchQuery(text);
    this.setState({searchInput: this.props.searchStore.searchQuery});
    this.props.movieStore.search(this.state.searchInput);
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <MovieCard movie={item} />}
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
