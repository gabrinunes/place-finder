import React from 'react'
import {View,Text,Image,TouchableOpacity, Modal} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import api from '../../Services/Places.api'
import {FontAwesome,Foundation,Feather} from '@expo/vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './styles'

import * as Location  from 'expo-location'
import * as Permmissions from 'expo-permissions'

export default class Places extends React.Component {
     state={
      places:null,
      loadingmark:true,
      geocode:null,
      error:'',
      visible:true,
      visiblemark:true,
      spinnerloading:false,
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

      getBoundsCoordinates(range){
        const {location}=this.state
        var lat_min = location.latitude - (0.009 * range)
        var long_min = location.longitude - (0.009 * range)
        var long_max = location.longitude + (0.009 * range)
        var lat_max = location.latitude + (0.009 * range)
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
         this.setState({spinnerloading:true})
         const {bbox} = this.state
         api.get(`mapbox.places/${query}.json?bbox=${bbox.long_min},${bbox.lat_min},${bbox.long_max},${bbox.lat_max}&limit=10&access_token=pk.eyJ1IjoiZ2Ficml4ZGQiLCJhIjoiY2s4amM2N3phMDIzbzNlcWJ3aG9wZnFiOSJ9.ZgSDvbJErpkkhQeYi3i-5w`)
         .then(response =>{

          this.setState({
            places:response.data.features,
            loading:false,
            spinnerloading:false,
            visiblemark:true
          })
         })
       }

       componentDidMount(){
         this.getLocation()
        }

  render() {
    const{places,location,loadingmark,geocode,visible,spinnerloading,visiblemark} = this.state
    if(loadingmark){
      return(
        <Spinner
         visible={true}
        />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerLocation}>
        <Text style={styles.location}>Localização</Text>
        <Text style={styles.street}>{geocode? `${geocode[0].street},${geocode[0].region}`:""}</Text>
        <View style={styles.mapButton}>
          <TouchableOpacity onPress={()=> this.setState({visible:true})}>
            <Feather name="map" size={35} color="#41414d"/>
          </TouchableOpacity>
        </View>
        </View>
        <Spinner
         visible={spinnerloading}
        />
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
          
        
          {places&& visiblemark
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
          <Modal
          transparent={true}
          visible={visible}
          >
            <View style={{backgroundColor:'#000000aa',flex:1}}>
              <View style={styles.modal}>
                <View style={styles.modalContainer}>
                <Text style={{fontSize:18,fontWeight:'bold',marginVertical:-20,marginBottom:2}}>Por favor Escolha um raio de busca em Km:</Text>
                <TouchableOpacity onPress={()=> this.setState({visible:false,visiblemark:false},this.getBoundsCoordinates('1'))}>
                  <Text style={styles.modalText}>1KM</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.setState({visible:false,visiblemark:false},this.getBoundsCoordinates('3'))}>
                  <Text style={styles.modalText}>3KM</Text>
                </TouchableOpacity><TouchableOpacity onPress={()=> this.setState({visible:false,visiblemark:false},this.getBoundsCoordinates('5'))}>
                  <Text style={styles.modalText}>5KM</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>

          </Modal>

         <View style={styles.bottom}>
         <TouchableOpacity onPress={()=> this.searchPlacesInterest('hospital')}>
         <FontAwesome name="hospital-o" style={styles.button}/>
           <Text style={styles.buttonText}>hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.searchPlacesInterest('delegacia')}>
        <Foundation name="sheriff-badge" size={35} style={{marginLeft:13,color:'#41414d'}}/>
           <Text style={styles.buttonText}>delegacia</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=> this.searchPlacesInterest('hotel')}>
        <FontAwesome name="hotel" style={styles.button}/>
           <Text style={{marginLeft:13}}>hotel</Text>
        </TouchableOpacity>
         </View>
      </View>
    );
  }
}

