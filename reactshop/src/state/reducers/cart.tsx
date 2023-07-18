import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART } from '../../constants/actionTypes'

type CartItemType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

type CartStateType = CartItemType[];

type CartActionType =
  | { type: typeof ADD_TO_CART, payload: CartItemType }
  | { type: typeof REMOVE_FROM_CART, payload: { id: number } }
  | { type: typeof REMOVE_ALL_FROM_CART }

const INIT_STATE: CartStateType = [];

const cartReducer = (state = INIT_STATE, action: CartActionType): CartStateType => {
  switch (action.type) {
    case ADD_TO_CART:
      const isInCart = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      return isInCart
        ? state.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...state, { ...action.payload, quantity: 1 }];
    case REMOVE_FROM_CART:
      const cartItemToRemove = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      return cartItemToRemove && cartItemToRemove.quantity === 1
        ? state.filter((cartItem) => cartItem.id !== action.payload.id)
        : state.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
    case REMOVE_ALL_FROM_CART:
      return [];
    default:
      return state;
  }
};

export default cartReducer;