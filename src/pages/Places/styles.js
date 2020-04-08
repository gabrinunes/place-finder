import {StyleSheet,Dimensions} from 'react-native'

const{width,heigth} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:25
    },
    loading:{
     flex:1,
     alignItems:'center',
     paddingTop:205
    }, 
    button:{
     fontSize:35,
     color:'#41414d',
     marginLeft:8
    },
    buttonText:{
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
     marginLeft:22,
    },
    mapButton:{
      alignItems:'flex-end',
      marginTop:-38,
      marginRight:8,
    },
    modal:{
      backgroundColor:'#ffffff',
      width:'80%',
      height: '35%',
      marginLeft:35,
      marginVertical:80,
      padding:40,
      borderRadius:10,
    },
    modalContainer:{
      alignItems:'center',
    },
    modalText:{
      margin:8,
      fontSize:18,
      fontWeight:'500'
    }, 
    mapStyle:{
      flex:0.95
    } 
  });