import React, { Component } from 'react';

import { View,TouchableOpacity,Text } from 'react-native';
import {FontAwesome,Foundation,Feather} from '@expo/vector-icons'
import api from '../../../Services/Places.api'
import {connect} from 'react-redux'
import appActions from '../../../store/action'
import styles from '../styles'


 class BottomButtons extends Component {

    searchPlacesInterest = (query)=>{
        this.props.dispatch(appActions.setSpinner(true))
        api.get(`mapbox.places/${query}.json?bbox=${this.props.bbox.long_min},${this.props.bbox.lat_min},${this.props.bbox.long_max},${this.props.bbox.lat_max}&limit=10&access_token=pk.eyJ1IjoiZ2Ficml4ZGQiLCJhIjoiY2s4amM2N3phMDIzbzNlcWJ3aG9wZnFiOSJ9.ZgSDvbJErpkkhQeYi3i-5w`)
        .then(response =>{
    
         const location = response.data.features
         const visiblemark = true 
         this.setLocation(location)
         this.setVisible(visiblemark)
         this.props.dispatch(appActions.setSpinner(false))
        })
      }

      setLocation = (location)=>{
         this.props.dispatch(appActions.setLocation(location))
      }

      setVisible = (visible)=>{
          this.props.dispatch(appActions.setVisible(visible))
      }

  render() {
    return (
        
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
    )
  }
}

export default connect(store =>({bbox: store.bbox}))(BottomButtons)