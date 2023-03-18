import {actionTypesFood} from "../actions/actionTypes";

const initState = {
   FoodApi : []
}

 const appReducer = (state = initState, action)=> {
    switch (action.type) {
        case actionTypesFood.showFoods:
            return {
                ...state,
                FoodApi: action.data.data ||null
            }
        
        default:
            return state;
    }
}


export default appReducer;