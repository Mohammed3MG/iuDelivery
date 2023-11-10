import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

// Define a functional component called BasketIcon
const BasketIcon = () => {
    // Retrieve the basket items from the Redux store
    const items = useSelector(selectBasketItems);
    // Get the navigation object from React Navigation
    const navigation = useNavigation(); 
    // Retrieve the total cost of items in the basket from the Redux store
    const basketTotal = useSelector(selectBasketTotal)
    
    // Check if there are no items in the basket, and if so, return nothing
    if (items.length === 0) return null;

    // If there are items in the basket, return a view with a button to navigate to the basket
    return (
        <View className='absolute bottom-10 w-full z-50'>
            {/* Add a touchable opacity button with an onPress event to navigate to the 'Basket' screen */}
            <TouchableOpacity onPress={() => navigation.navigate('Basket')} className='mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1'>
                {/* Display the number of items in the basket */}
                <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
                    {items.length}
                </Text>
                {/* Display text for 'View Basket' */}
                <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text>
                {/* Display the total cost of items in the basket */}
                <Text className='text-lg text-white font-extrabold'>
                    { basketTotal } €
                </Text>
            </TouchableOpacity>
        </View>
    )
}

// Export the BasketIcon component
export default BasketIcon
