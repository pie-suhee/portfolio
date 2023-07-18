import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART } from '../../constants/actionTypes';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: Product;
}

interface RemoveAllFromCartAction {
  type: typeof REMOVE_ALL_FROM_CART;
}

type CartActionTypes = AddToCartAction | RemoveFromCartAction | RemoveAllFromCartAction;

const addToCart = (product: Product): CartActionTypes => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

const removeFromCart = (product: Product): CartActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

const removeAllFromCart = () => {
  return {
    type: REMOVE_ALL_FROM_CART,
  };
};

export { addToCart, removeFromCart, removeAllFromCart };
