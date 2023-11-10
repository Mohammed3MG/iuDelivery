import { createSlice } from '@reduxjs/toolkit'

// Define the initial state of the basket with an empty array of items
const initialState = {
  items: [],
}

// Create a Redux slice called "basketSlice"
export const basketSlice = createSlice({
    name: 'counter', // Give the slice a name
    initialState,      // Use the defined initial state
    reducers: {
        // Define a reducer to add an item to the basket
        addToBasket: (state, action) => {
            // Update the basket state by adding the new item
            state.items = [...state.items, action.payload];
        },
      
        // Define a reducer to remove an item from the basket
        removeFromBasket: (state, action) => {
            // Find the index of the item to be removed in the basket
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id);

            // Create a new basket array
            let newBasket = [...state.items];

            if (index >= 0) {
                // Remove the item from the new basket
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id:${action.payload.id}) as it's not in the basket`
                );
            }

            // Update the basket state with the new basket
            state.items = newBasket;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors to get specific parts of the basket state
export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
    state.basket.items.filter((item) => item.id === id);
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) =>
    total += item.price, 0);

// Export the reducer function for the basketSlice
export default basketSlice.reducer;
