import React from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';

var { height, width } = Dimensions.get('window');

export default class OneImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failed: false,
      poster_path: this.props.poster_path
    };
  }

  _onError = () => { this.setState({ failed: true }); }

  render() {
    return (
      <View>
      {this.state.failed && (<Image
        style = {styles.moviePoster}
        resizeMode="cover"
        source={require('../img/no-image.jpg')}
        onError={this._onError}
      />)}
      {!this.state.failed && (<Image
        style = {styles.moviePoster}
        resizeMode="cover"
        source={{
          uri: `https://image.tmdb.org/t/p/w400${this.state.poster_path}`
        }}
        onError={this._onError}
      />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  moviePoster: {
    alignSelf: 'center',
    margin: 15,
    width: 0.3 * width,
    height: 0.4 * width,
  }
});
