import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User';
import gigReducer from './Gig';
import gigPageList from './ClientGigPage';

const rootReducer = combineReducers({
    user: userReducer,
    gig: gigReducer,
    gigList: gigPageList
})

const persistConfig = {
    key: 'root', // this is the key used to store the persisted state in storage
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };

