import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Movie} from '../../models/Movie';

interface MovieCardProps {
  movie: Movie;
}

class MovieCard extends Component<MovieCardProps> {
  render() {
    const {movie} = this.props;

    return (
      <View style={styles.card}>
        <Image source={{uri: movie.imgPoster}} style={styles.poster} />
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieCard;
