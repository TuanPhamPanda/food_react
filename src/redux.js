import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig =()=>{
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persiststore = persistStore(store);
    return {store, persiststore};
}

export default reduxConfig;