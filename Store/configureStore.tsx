import { toggleFavorite } from './Reducers/favoriteReducer';
import {loadAvatar} from './Reducers/avatarReducer';
import {createStore} from 'redux';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootPersistConfig = {
	key: 'root',
	storage: AsyncStorage
  }

  
const Store = createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite,loadAvatar}));

export default Store;