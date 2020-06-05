import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { withNavigation } from "react-navigation";

class LoginScreen extends React.Component {

  componentDidMount() {
    setTimeout(()=>
      this.props.navigation.navigate('Main'), 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: 'https://source.unsplash.com/16Tu8S18pu4'}} style={styles.image}>
          <View style={styles.row}>
            <Image
            style={styles.tinyLogo}
              source={require('../img/logo.png')}/>
            <Text style={{padding: 10, fontSize: 16}}>Movie Info</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 500
  },
  row: {
	  justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
		margin: 10
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
