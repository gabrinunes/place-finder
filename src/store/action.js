export default {
    setBbox(bbox){
        return {type:'SET_BBOX' ,payload:bbox}
    },
    setCorrd(location){
        return {type:'SET_COORD',payload:location}
    },
    setLocation(places){
       return {type:'SET_LOC',payload:places}    
    },
    setVisible(visible){
        return {type:'SET_VISIBLE',payload:visible}
    },
    setInVisible(visible){
        return {type:'SET_INVISIBLE',payload:visible}
    },
    setSpinner(spinner){
        return {type:'SET_SPINNER',payload:spinner}
    }
}