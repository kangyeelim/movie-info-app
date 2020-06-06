import React from 'react';
import { withNavigation } from "react-navigation";
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Button, FlatList, Dimensions, Image } from 'react-native';
import { fetchPopularMovies } from '../Api.js';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons'

var { height, width } = Dimensions.get('window');

class PopularMoviesScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Popular Movies'
  })

  constructor() {
    super();
    this.state = {
      failed: false,
      isFetched: false,
      movies: null,
    };
  }

  async getMovies() {
      const results = await fetchPopularMovies(this.state.title);
      this.setState({movies: results});
      this.setState({isFetched:true});
  }

  componentDidMount() {
    this.getMovies();
  }

  handleSelectMovie({item}) {
    this.props.navigation.push('MovieDetails', item)
  }

  _onError = () => { this.setState({ failed: true }); }

  movieResult({item}) {
    return (
      <TouchableOpacity style={styles.touchable} onPress={() => this.handleSelectMovie({item})}>
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
          uri: `https://image.tmdb.org/t/p/w400${item.poster}`
        }}
        onError={this._onError}
      />)}
        <Text style={{fontWeight: 'bold', fontSize:20}}>{item.title}</Text>
        <Text>Release Date: {item.release_date}</Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
      <View style={{marginTop: 10}}>
        { this.state.isFetched && (<FlatList style={styles.flatlist}
        data={this.state.movies}
        renderItem={item => this.movieResult(item)}
        keyExtractor={item => item.key + item.title}/>)}
      </View>

      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  flatlist: {
    margin:10,
    paddingTop: 20
  },
  moviePoster: {
    alignSelf: 'center',
    margin: 15,
    width: 0.5 * width,
    height: 0.9 * width,
    marginBottom: 50
  },
  touchable: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    marginBottom:20
  }
});

export default withNavigation(PopularMoviesScreen);
