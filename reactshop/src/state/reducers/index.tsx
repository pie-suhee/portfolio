import productsReducer from './products';
import cartReducer from './cart';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;