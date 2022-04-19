import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "reducers/index"
import thunk from "redux-thunk";
import logger from "redux-logger";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [logger, thunk]

const initialState = {};

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(
    persistConfig, 
    rootReducer
);

const store = createStore(
    persistedReducer,
    initialState,
    compose (
        applyMiddleware(...middleware),
    )
);

const persistor = persistStore(store);

export {  store,  persistor };