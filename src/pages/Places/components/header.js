import React, { Component } from 'react';
import {View,Text,Image,TouchableOpacity,Modal} from 'react-native'
import * as Location  from 'expo-location'
import {connect} from 'react-redux'
import appActions from '../../../store/action'
import styles from '../styles'
import {Feather} from '@expo/vector-icons'

   class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocode:null,
      visible:true,
      bbox:null
    };
  }
   
  componentDidMount(){
      this.getGeocodeAsync()
  }

  getGeocodeAsync = async() =>{
    let geocode = await Location.reverseGeocodeAsync(this.props.location)
    this.setState({geocode})
  }

  setbbox(bbox){
    this.props.dispatch(appActions.setBbox(bbox))
  }

  setInVisible(visible){
    this.props.dispatch(appActions.setInVisible(visible))
  }
   
 

  getBoundsCoordinates(range){
    var lat_min = this.props.location.latitude - (0.009 * range)
    var long_min = this.props.location.longitude - (0.009 * range)
    var long_max = this.props.location.longitude + (0.009 * range)
    var lat_max = this.props.location.latitude + (0.009 * range)
     const bbox ={
        lat_max,
        long_min,
        lat_min,
        long_max
      }
      this.setbbox(bbox)
    
  }
  
  
  render() {
      const {geocode,visible}=this.state
    return (
        <View style={styles.headerLocation}>
        <Text style={styles.location}>Localização</Text>
        <Text style={styles.street}>{geocode? `${geocode[0].street},${geocode[0].region}`:""}</Text>
        <View style={styles.mapButton}>
          <TouchableOpacity onPress={()=> this.setState({visible:true})}>
            <Feather name="map" size={35} color="#41414d"/>
          </TouchableOpacity>
        </View>
        <Modal
        transparent={true}
        visible={visible}
        >
          <View style={{backgroundColor:'#000000aa',flex:1}}>
            <View style={styles.modal}>
              <View style={styles.modalContainer}>
              <Text style={{fontSize:18,fontWeight:'bold',marginVertical:-20,marginBottom:2}}>Por favor Escolha um raio de busca em Km:</Text>
              <TouchableOpacity onPress={()=> this.setState({visible:false},this.setInVisible(false),this.getBoundsCoordinates('1'))}>
                <Text style={styles.modalText}>1KM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.setState({visible:false},this.setInVisible(false),this.getBoundsCoordinates('3'))}>
                <Text style={styles.modalText}>3KM</Text>
              </TouchableOpacity><TouchableOpacity onPress={()=> this.setState({visible:false},this.setInVisible(false),this.getBoundsCoordinates('5'))}>
                <Text style={styles.modalText}>5KM</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>
        </View>
    );
  }
}

export default connect(store =>({bbox: store.bbox, location: store.location}))(header)



