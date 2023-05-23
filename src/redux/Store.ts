import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User';
import gigReducer from './Gig';
import gigPageList from './ClientGigPage';
import MesssageSelectedUser from './MessageSelectedUserSlice';
import FreelancerPage from './FreelancerPage';

const rootReducer = combineReducers({
    user: userReducer,
    gig: gigReducer,
    gigList: gigPageList,
    messageUser: MesssageSelectedUser,
    freelancerPage: FreelancerPage,
})

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };

