import { createSlice } from '@reduxjs/toolkit';
import userSlice from '../user/userSlice';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      // Keeping all the elements whose id is different from the pass one
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // finding the pizza with the id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // now increasing the quantity of that item
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      // finding the pizza with the id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // now decreasing the quantity of that item
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      // REUSING THE CART LOGIC OF DELETING A ITEM FROM THE CART
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// USING THIS IN THE CART OVERVIEW USESELECTOR FUNCTION
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// to get if an pizza is in the cart and then display the addItem or delete button accordingly
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// reselect library to optimize it even more
