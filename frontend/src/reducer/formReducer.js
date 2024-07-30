const formReducer = (state, action) => {
    switch(action.type){
        case 'GET': {
            return [...action.payload]
        }
        case 'CREATE':{
            return [...state, action.payload]
        }
        case 'EDIT': {
            return state.map(ele=>{
                if(ele._id == action.payload._id){
                    return {...action.payload}
                }else{
                    return {...ele}
                }
            })
        }
        case 'DEL': {
            return state.filter(ele=>ele._id !== action.payload)
        }
        default:{
            return state
        }
    }
}
export default formReducer