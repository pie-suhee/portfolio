export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';

export type ActionType =
  | typeof SET_PRODUCTS
  | typeof ADD_TO_CART
  | typeof REMOVE_FROM_CART
  | typeof REMOVE_ALL_FROM_CART;