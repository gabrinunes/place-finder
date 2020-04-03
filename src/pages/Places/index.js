import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import api from '../../Services/Places.api'


export default class Places extends React.Component {
     state={
      places:null,
      coords:{
        latitude:null,
        longitude:null,
      },
      loading:true
       }      
      searchPlaces = ()=>{
         api.get('mapbox.places/hospital.json?bbox=-48.468709,-1.451940,-48.436370,-1.419611&access_token=pk.eyJ1IjoiZ2Ficml4ZGQiLCJhIjoiY2s4amM2N3phMDIzbzNlcWJ3aG9wZnFiOSJ9.ZgSDvbJErpkkhQeYi3i-5w')
         .then(response =>{
          
          this.setState({
             places:response.data.features,
             loading:false
           })
         })
       }

       componentDidMount(){
         this.searchPlaces()
       }
  render() {
    const{places,loading,coords} = this.state
    if(loading){
     return <Text>Teste</Text>
    }
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} 
         initialRegion={{
             latitude:-1.4347828,
             longitude:-48.4515453,
             latitudeDelta: 0.0080,
             longitudeDelta: 0.0060 
         }}
        >
        {places.map((location,id)=><Marker
         key={id}
         coordinate={{
           latitude:location.geometry.coordinates[1],
           longitude:location.geometry.coordinates[0],
         }}
         title={location.text}
        />)}
        </MapView>
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
    width:400,
    height:400,
  },
});