const initialState = {bbox:null,places:null,visiblemark:true,spinnerloading:false,location:null}

export default (state = initialState, action)=>{
    switch(action.type){
        case 'SET_BBOX':
            return {...state, bbox:action.payload}    
    }
    switch(action.type){
       case 'SET_COORD':
           return {...state,location:action.payload}
    }
    switch(action.type){
      case 'SET_LOC':
          return {...state,places:action.payload}
          
    }
    switch(action.type){
        case 'SET_VISIBLE':
            return {...state,visiblemark:action.payload}
                  
    }
     switch(action.type){
         case 'SET_INVISIBLE':
             return {...state,visiblemark:action.payload}

     }
     switch(action.type){
         case 'SET_SPINNER':
             return {...state,spinnerloading:action.payload}

             default:
            return state
     }
}