import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'

const {width,height} = Dimensions.get('screen')
export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    button:{
      fontSize:14,
      fontWeight:'500',
    },
    bottom:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginRight:9,
      marginLeft:9,
    },
    mapStyle:{
      flex:1
    } 
  });