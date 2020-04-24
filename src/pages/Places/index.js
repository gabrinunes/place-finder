import React from 'react'
import {View} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './styles'

import Appaction from '../../store/action'
import {connect} from 'react-redux'
import Header from './components/header'
import BottomButtons from './components/BottomButtons'
import * as Location  from 'expo-location'
import * as Permmissions from 'expo-permissions'

 class Places extends React.Component {
     state={
      loadingmark:true,
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
        this.props.dispatch(Appaction.setCorrd(location.coords))
        this.setState({
          location:{
            latitude,
            longitude
          },
          loadingmark:false
        })
      }

       

       componentDidMount(){
         this.getLocation()
        }

  render() {
    const{location,loadingmark} = this.state
    if(loadingmark){
      return(
        <Spinner
         visible={true}
        />
      )
    }
    return (
      <View style={styles.container}>
        
        <Header/>

        <Spinner
         visible={this.props.spinnerloading}
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
          
        
          {this.props.places && this.props.visiblemark
          ?this.props.places.map((location,id)=>    //condição para evitar erro de null ou undefined,solução criada para executar a função apos o carreamento da tela.
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
          

       <BottomButtons/>
      </View>
    );
  }
}
export default connect(store =>({places: store.places,visiblemark: store.visiblemark,spinnerloading:store.spinnerloading}))(Places)
