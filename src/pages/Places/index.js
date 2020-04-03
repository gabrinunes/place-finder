import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import api from '../../Services/Places.api'
import {FontAwesome} from '@expo/vector-icons'
import styles from './styles'

export default class Places extends React.Component {
     state={
      places:null,
      loading:true,
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

       searchPlacesInterest = (query)=>{
         api.get(`mapbox.places/${query}.json?bbox=-48.468709,-1.451940,-48.436370,-1.419611&access_token=pk.eyJ1IjoiZ2Ficml4ZGQiLCJhIjoiY2s4amM2N3phMDIzbzNlcWJ3aG9wZnFiOSJ9.ZgSDvbJErpkkhQeYi3i-5w`)
         .then(response =>{

          this.setState({
            places:response.data.features
          })
         })
       }

       componentDidMount(){
         this.searchPlaces()
       }
  render() {
    const{places,loading,query} = this.state
    if(loading){
     return null
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
         description={location.properties.address}
        />)}
        </MapView>
         <View style={styles.bottom}>
         <TouchableOpacity onPress={()=> this.searchPlacesInterest('hospital')}>
         <FontAwesome name="hospital-o" size={26}/>
           <Text style={styles.button}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.searchPlacesInterest('delegacia')}>
        <FontAwesome name="siren" size={26}/>
           <Text style={styles.button}>Delegacia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.searchPlacesInterest('hotel')}>
        <FontAwesome name="hotel" size={26}/>
           <Text style={styles.button}>Hotel</Text>
        </TouchableOpacity>
         </View>
      </View>
    );
  }
}

