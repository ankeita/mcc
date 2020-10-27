import { toggleFavorite } from './Reducers/favoriteReducer';
import {createStore} from 'redux';

const Store = createStore(toggleFavorite);

export default Store;