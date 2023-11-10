import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';
import { useState } from 'react';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

// Define a functional component called DishRow that receives several props
const DishRow = ({ id, name, description, price, image }) => {
    // Define a state variable to track whether the row is pressed or not
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    
    // Use the useSelector hook to retrieve items from the Redux store that match the given dish id
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    
    // Function to add the dish to the shopping basket
    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    };
    
    // Function to remove the dish from the shopping basket
    const removeItemFromBasket = () => {
        // If there are no items in the basket for this dish, do nothing
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id }));
    };

    return (
        <>
            {/* Render a touchable component to toggle the "isPressed" state */}
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-200 ${
                    isPressed && "border-b-0"
                }`}
            >
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        {/* Display the dish name */}
                        <Text className='text-lg mb-1'>{name}</Text>
                        {/* Display the dish description */}
                        <Text className='text-gray-400'>{description}</Text>
                        {/* Display the dish price */}
                        <Text className='text-gray-400 mt-2'>
                            {price} €
                        </Text>
                    </View>
                    <View>
                        {/* Display the dish image using the URL obtained from sanityClient */}
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: '#F3F3F4',
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className='h-20 w-20 bg-gray-300 p-4'
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Display additional details and actions when the row is pressed */}
            {isPressed && (
                <View className='bg-white px-4'>
                    <View className='flex-row items-center space-x-2 pb-3'>
                        {/* Display a button to remove an item from the basket (if there are items) */}
                        <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                            <MinusCircleIcon color={items.length > 0 ? '#00CCBB' : 'gray'} size={40} />
                        </TouchableOpacity>
                        {/* Display the quantity of items in the basket for this dish */}
                        <Text>{items.length}</Text>
                        {/* Display a button to add an item to the basket */}
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon color='#00CCBB' size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

// Export the DishRow component
export default DishRow;
