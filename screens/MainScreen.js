import React from 'react';
import { withNavigation } from "react-navigation";
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Button, FlatList, Dimensions } from 'react-native';
import { fetchMovies } from '../Api.js';

const initialState = {
  title: '',
  movies: null
}

/*const processMovie = (movie) => ({
    key: String(movie.id),
    title: movie.title,
    release_date: movie.release_date,
    poster: movie.poster_path,
    adult: movie.adult,
    overview: movie.overview,
    popularity: movie.popularity,
    vote_count: movie.vote_count,
    vote_average: movie.vote_average
})*/

class MainScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Search Movie'
  })

  constructor() {
    super();
    this.state = initialState;
  }

/*  async fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.api_key}&query=${this.state.title}&language=en-US`)
    const result  = await response.json();
    const results = await result.results;
    if (result.total_results > 0) {
      this.setState({ movies: results.map(processMovie)});
    }
  }*/

  async getMovies() {
      const results = await fetchMovies(this.state.title);
      this.setState({movies: results});
  }

  setTitle(input) {
    this.setState({title: input});
    this.getMovies();
  }

  handleSelectMovie({item}) {
    this.props.navigation.push('MovieDetails', item)
  }

  movieResult({item}) {
    return (
      <TouchableOpacity style={styles.touchable} onPress={() => this.handleSelectMovie({item})}>
        <Text style={{fontWeight: 'bold', fontSize:16}}>{item.title}</Text>
        <Text>Release Date: {item.release_date}</Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.row}>
            <TextInput
					style={styles.input}
					placeholder="Movie Title"
					onChangeText={title => this.setTitle(title)}
					defaultValue={this.state.title}
					ref={input => { this.titleInput = input }}
				      />
          </View>
          <View style={{marginTop: 10}}>
            <FlatList style={styles.flatlist}
            data={this.state.movies}
            renderItem={item => this.movieResult(item)}
            keyExtractor={item => item.key + item.title}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  row: {
    flex: 1,
	  justifyContent: 'center',
    alignSelf: 'center',
    //alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
		margin: 15,
  },
  input: {
	  borderWidth: 1,
    borderColor: '#777',
    flex: 1,
	  height: 36,
    fontSize:16,
    paddingLeft: 5,
    borderRadius: 2,
  },
  buttonContainer: {
    paddingLeft: 2
  },
  flatlist: {
    marginLeft:20,
    marginRight:20,
    marginTop: 10,
    paddingTop: 10,
    marginBottom: 20
  },
  touchable: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    marginBottom:10
  }
});

export default withNavigation(MainScreen);
