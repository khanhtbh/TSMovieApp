import React, {Component} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {Movie, MovieDetail} from 'n-movie-sdk';
import {MovieStore} from 'n-movie-sdk';
import {ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native';

interface MovieDetailScreenProps {
  movie: Movie;
  movieStore: MovieStore;
}
@observer
export default class MovieDetailScreen extends Component<MovieDetailScreenProps> {
  constructor(props: MovieDetailScreenProps) {
    super(props);
    this.props.navigation.setOptions({title: props.movie.title});
    this.props.movieStore.getMovieDetail(this.props.movie.id);
  }
  render() {
    if (this.props.movieStore.isLoading) {
      return (
        <View style={[styles.loading_container, styles.loading_horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const {name, description, image, actor, review, keywords} =
      this.props.movieStore.movieDetail;

    return (
      <ScrollView nestedScrollEnabled={false} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={styles.poster}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.sectionTitle}>Actors:</Text>
        <FlatList
          scrollEnabled={false}
          data={actor}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={(_item, index) => index.toString()}
        />
        <Text style={styles.sectionTitle}>Reviews:</Text>
        {review !== null && review !== undefined ? (
          <FlatList
            scrollEnabled={false}
            windowSize={2}
            data={[review]}
            renderItem={({item}) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.reviewBody}</Text>
                </View>
              );
            }}
            keyExtractor={(_item, index) => index.toString()}
          />
        ) : (
          <Text>No reviews</Text>
        )}
        <Text style={styles.sectionTitle}>Keywords:</Text>
        {keywords !== null && keywords !== undefined ? (
          <FlatList
            scrollEnabled={false}
            data={keywords.split(',')}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={(_item, index) => index.toString()}
          />
        ) : (
          <Text>No keywords</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: 'center',
  },
  loading_horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
