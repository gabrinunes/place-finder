import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:25
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
    location:{
    fontSize:22,
    fontWeight:'300'
    },
    street:{
     marginTop:3
    },
    headerLocation:{
     flex:0.13,
     marginLeft:22
    },
    mapStyle:{
      flex:1
    } 
  });