import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the restaurant slice with default values
const initialState = {
  restaurant: {
    id: null,
    imgUrl: '',
    title: '',
    rating: 0,
    genre: '',
    address: '',
    short_description: '',
    dishes: [],
  },
};

// Create a Redux slice called "restaurantSlice"
export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // Define a reducer to set the restaurant information in the state
    setRestaurant: (state, action) => {
      // Update the restaurant state with the provided payload
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for the "setRestaurant" reducer
export const { setRestaurant } = restaurantSlice.actions;

// Selector to retrieve the restaurant information from the state
export const selectRestaurant = (state) => state.restaurant.restaurant;

// Export the reducer function for the restaurantSlice
export default restaurantSlice.reducer;
