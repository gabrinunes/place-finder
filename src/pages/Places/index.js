import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import MapView from 'react-native-maps'

export default class Places extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <MapView style={styles.mapStyle} 
           initialRegion={{
               latitude:-1.4347828,
               longitude:-48.4515453,
               latitudeDelta: 0.0080,
               longitudeDelta: 0.0060 
           }}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  