import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import MapView,{Marker, Callout} from 'react-native-maps'
import api from '../../Services/Places.api'
import {FontAwesome} from '@expo/vector-icons'
import styles from './styles'

import * as Location  from 'expo-location'
import * as Permmissions from 'expo-permissions'

export default class Places extends React.Component {
     state={
      places:null,
      loadingmark:true,
      geocode:null,
      error:'',
      bbox:null,
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
        this.getBoundsCoordinates()
      }

      getBoundsCoordinates(){
        const {location}=this.state
        var lat_min = location.latitude - (0.009 * 5)
        var long_min = location.longitude - (0.009 * 5)
        var long_max = location.longitude + (0.009 * 5)
        var lat_max = location.latitude + (0.009 * 5)
        this.setState({
          bbox:{
            lat_max,
            long_min,
            lat_min,
            long_max
          }
        })
      }


       searchPlacesInterest = (query)=>{
         const {bbox} = this.state
         api.get(`mapbox.places/${query}.json?bbox=${bbox.long_min},${bbox.lat_min},${bbox.long_max},${bbox.lat_max}&limit=10&access_token=pk.eyJ1IjoiZ2Ficml4ZGQiLCJhIjoiY2s4amM2N3phMDIzbzNlcWJ3aG9wZnFiOSJ9.ZgSDvbJErpkkhQeYi3i-5w`)
         .then(response =>{

          this.setState({
            places:response.data.features,
            loading:false
          })
         })
       }

       componentDidMount(){
         this.getLocation()
        }

  render() {
    const{places,location,loadingmark,geocode} = this.state
    if(loadingmark){
      return(
      <View style={styles.loading}>
        <Image source={require('../../../assets/loading.gif')} style={{width:150,height:150}}/>
      </View>
      )
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
             latitudeDelta: 0.0650,
             longitudeDelta: 0.0650 
         }}
        >
        <Marker
         coordinate={{
           latitude:location.latitude,
           longitude:location.longitude,
         }}
         title={'localização atual'}
         image={require('../../../assets/home-icon.png')}
        >
        </Marker>
          
        
          {places
          ?places.map((location,id)=>    //condição para evitar erro de null ou undefined,solução criada para executar a função apos o carreamento da tela.
          <Marker
            key={id}
            coordinate={{
              latitude:location.geometry.coordinates[1],
              longitude:location.geometry.coordinates[0]
            }}
            title={location.text}
           >
          </Marker>
          ):null}
          
      
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

