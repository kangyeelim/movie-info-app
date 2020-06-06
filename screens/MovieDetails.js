import React from 'react';
import { withNavigation } from "react-navigation";
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { fetchMoreMovieDetails } from '../Api.js'

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
      moreDetails: null,
    };
  }

  getMoreDetails = async () => {
    var movie_id = this.props.navigation.getParam('key');
    var moreDetails= await fetchMoreMovieDetails(movie_id);
    this.setState({moreDetails: moreDetails});
    this.setState({isFetched: true});
  }

  componentDidMount() {
    this.getMoreDetails();
  }


  _onError = () => { this.setState({ failed: true }); }

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
          {this.props.navigation.getParam('adult') && (
          <Text style={styles.normal}>R Rated</Text>)}
          {!this.props.navigation.getParam('adult') && (
          <Text style={styles.normal}>PG 13</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Runtime: {this.state.moreDetails.runtime} Mins</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Language(s): {this.state.moreDetails.languages}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Genre(s): {this.state.moreDetails.genres}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Status: {this.state.moreDetails.status}</Text>)}
          {this.state.isFetched && (
          <Text style={styles.normal}>Production Companies: {this.state.moreDetails.productionCompanies}</Text>)}
          <Text style={styles.normal}>Release date: {this.props.navigation.getParam('release_date')}</Text>
          <Text style={styles.middle}>Ratings</Text>
          <Text style={styles.normal}>Popularity: {this.props.navigation.getParam('popularity')}</Text>
          <Text style={styles.normal}>Vote Average: {this.props.navigation.getParam('vote_average')}</Text>
          <Text style={styles.normal}>Vote Count: {this.props.navigation.getParam('vote_count')}</Text>
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
    marginBottom: 50
  },
  small: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 12
  },
  intro: {
    marginLeft: 20,
    fontSize: 16,
    marginRight: 15
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
    marginLeft: 5,
    marginRight: 5
  }
})
