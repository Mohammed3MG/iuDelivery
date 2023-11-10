import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { firebase } from '../Firebase/Config';

const BasketScreen = () => {
    // Get navigation object
    const navigation = useNavigation();

    // Select restaurant and basket items from Redux store
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    // State to group items in the basket
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    // Group basket items by their IDs using the 'groupedItems' state
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    // Firebase Firestore reference to 'myOrders' collection
    const todo = firebase.firestore().collection('myOrders');

    // Function to add a new document to the 'myOrders' collection with order details
    const addField = () => {
        const data = {
            total: basketTotal,
            items: items,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        todo.add(data);
    }

    // Function to navigate to 'PreparingOrderScreen' and add an order field to Firestore
    const navScreen = () => {
        navigation.navigate('PreparingOrderScreen');
        addField();
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                {/* Basket Header */}
                <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>     
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    {/* Button to close the basket */}
                    <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-3 right-5'>
                        <XCircleIcon color='#00CCBB' height={50} width={50} />
                    </TouchableOpacity>
                </View>

                {/* Delivery Information */}
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru",
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Deliver in 25-30 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>

                {/* List of Basket Items */}
                <ScrollView className='divide-y divide-gray-300'>
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                        <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-2'>
                            <Text className='text-[#00CCBB]'>{items.length} x</Text>
                            <Image
                                source={{
                                    uri: urlFor(items[0]?.image).url()
                                }}
                                className="h-12 w-12 row-span-full"
                            />
                            <Text className='flex-1'>{items[0]?.name}</Text>
                            <Text className='text-gray-600'>{items[0].price} €</Text>
                            {/* Button to remove an item from the basket */}
                            <TouchableOpacity>
                                <Text className='text-[#00CCBB]' onPress={() => dispatch(removeFromBasket({id: key}))}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Order Summary and Place Order Button */}
                <View className='p-5 bg-white mt-5 space-y-4'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Subtotal</Text>
                        <Text className='text-gray-400'>{basketTotal} €</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Free Delivery</Text>
                        <Text className='text-gray-400'>0.00 €</Text>
                    </View>
                    <View className='flex-row justify-between'>
                        <Text>Order Total</Text>
                        <Text className='font-extrabold'>{basketTotal} €</Text>
                    </View>
                    {/* Button to place the order and navigate to the next screen */}
                    <TouchableOpacity onPress={onPress} className='rounded-lg bg-[#00CCBB] p-4'>
                        <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen;
