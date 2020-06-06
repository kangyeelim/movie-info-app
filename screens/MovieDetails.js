import React from 'react';
import { withNavigation } from "react-navigation";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { fetchMoreMovieDetails } from '../Api.js';
import OneImage from './OneImage.js';

var { height, width } = Dimensions.get('window');

class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Movie Details'
  })

  constructor() {
    super();
    this.state = {
      failed: false,
      isFetched: false,
      moreDetails: null
    };
  }

  getMoreDetails = async () => {
    var movie_id = this.props.navigation.getParam('key');
    var moreDetails = await fetchMoreMovieDetails(movie_id);
    this.setState({moreDetails: moreDetails});
    this.setState({isFetched: true});
  }

  componentDidMount() {
    this.getMoreDetails();
  }


  _onError = () => { this.setState({ failed: true }); }

  ratingItem({item}) {
    return (
        <Text style={styles.normal}>{item.Source}: {item.Value}</Text>
    );
  }

  handleSelectMovie({item}) {
    this.props.navigation.push('MovieDetails', item)
  }

  recommendationItem({item}) {
    return (
      <TouchableOpacity style={styles.touchable} onPress={() => this.handleSelectMovie({item})}>
        <OneImage
          poster_path={item.poster}
        />
        <Text style={styles.normal}>{item.title}</Text>
        <Text style={styles.small}>Release Date: {item.release_date}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{this.props.navigation.getParam('title')}</Text>
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
              uri: `https://image.tmdb.org/t/p/w400${this.props.navigation.getParam('poster')}`
            }}
            onError={this._onError}
          />)}
          <Text style={styles.intro}>{this.props.navigation.getParam('overview')}</Text>
          <Text style={styles.middle}>Information</Text>
          {this.state.isFetched && (
          <Text style={styles.normal}>Rated: {this.state.moreDetails.rated}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Runtime: {this.state.moreDetails.runtime} Mins</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Language(s): {this.state.moreDetails.languages}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Genre(s): {this.state.moreDetails.genres}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Status: {this.state.moreDetails.status}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Actor(s): {this.state.moreDetails.actors}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Director(s): {this.state.moreDetails.director}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Writer(s): {this.state.moreDetails.writer}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Production Companies: {this.state.moreDetails.productionCompanies}</Text>)}
          <Text style={styles.normal}>Release date: {this.props.navigation.getParam('release_date')}</Text>
          <Text style={styles.middle}>Ratings</Text>
          <SafeAreaView style={{flex: 1}}>
          {this.state.isFetched && (<FlatList
            data={this.state.moreDetails.ratings}
            renderItem={item => this.ratingItem(item)}
            keyExtractor={item => item.Source + item.Value}/>)}
          </SafeAreaView>
          <Text style={styles.normal}>Popularity: {this.props.navigation.getParam('popularity')}</Text>
          <Text style={styles.normal}>Vote Average: {this.props.navigation.getParam('vote_average')}</Text>
          <Text style={styles.normal}>Vote Count: {this.props.navigation.getParam('vote_count')}</Text>
          <Text style={styles.middle}>Other Recommended Movies</Text>
          {this.state.isFetched && (<FlatList
          data={this.state.moreDetails.recommendations}
          renderItem={item => this.recommendationItem(item)}
          keyExtractor={item => item.key + item.title}/>)}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(MovieDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    alignSelf: 'center',
    margin: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  moviePoster: {
    alignSelf: 'center',
    margin: 15,
    width: 0.85 * width,
    height: 1.2 * width,
    marginBottom: 30
  },
  small: {
    alignSelf:'center',
    marginTop: 5,
    fontSize: 12,
    marginBottom: 5
  },
  intro: {
    alignSelf:'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16
  },
  middle: {
    alignSelf:'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16
  },
  normal: {
    alignSelf:'center',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15
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
})
