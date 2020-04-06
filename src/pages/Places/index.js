import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import api from '../../Services/Places.api'
import {FontAwesome} from '@expo/vector-icons'
import styles from './styles'

import * as Location  from 'expo-location'
import * as Permmissions from 'expo-permissions'

export default class Places extends React.Component {
     state={
      places:null,
      loading:true,
      loadingmark:true,
      geocode:null,
      error:'',
      location:null
       }
       
      getLocation = async ()=>{
        let {status} = await Permmissions.askAsync(Permmissions.LOCATION)
        if(status!='granted'){
          this.setState({
            error:'Permissão negada'
          })
        }

        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest})

        const{latitude,longitude} = location.coords
        this.getGeocodeAsync({latitude,longitude})
        this.setState({
          location:{
            latitude,
            longitude
          },
          loadingmark:false
        })
      }

      getGeocodeAsync = async(location) =>{
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({geocode})
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
         this.getLocation()
         this.searchPlaces()
        }

  render() {
    const{places,loading,location,loadingmark,geocode} = this.state
    if(loading||loadingmark){
     return null
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerLocation}>
        <Text style={styles.location}>Localização</Text>
        <Text style={styles.street}>{geocode? `${geocode[0].street},${geocode[0].region}`:""}</Text>
        </View>
        <MapView style={styles.mapStyle} 
         initialRegion={{
             latitude:location.latitude,
             longitude:location.longitude,
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
         <FontAwesome name="hospital-o" size={45}/>
           <Text style={styles.button}>hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.searchPlacesInterest('delegacia')}>
        <FontAwesome name="hotel" size={45}/>
           <Text style={styles.button}>delegacia</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=> this.searchPlacesInterest('hotel')}>
        <FontAwesome name="hotel" size={45}/>
           <Text style={{marginLeft:13}}>hotel</Text>
        </TouchableOpacity>
         </View>
      </View>
    );
  }
}

