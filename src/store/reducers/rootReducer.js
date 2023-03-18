import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
  }
  
const rootReducer = combineReducers({
    app: appReducer
})

export default rootReducer;