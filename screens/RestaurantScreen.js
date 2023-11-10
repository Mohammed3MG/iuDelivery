import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
    StarIcon
}
from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { setRestaurant } from '../features/restaurantSlice';
import { useDispatch } from "react-redux";

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Get restaurant data from the route parameters
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    },
    } = useRoute();

    // Store restaurant data in a useMemo to prevent unnecessary recalculations
    const restaurantData = useMemo(() => ({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
    }), [id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat]);

    // Dispatch the restaurant data to Redux store when it changes
    useEffect(() => {
        dispatch(setRestaurant(restaurantData));
    }, [dispatch, restaurantData]);

    // Hide the header in the navigation stack
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });

    return (
        <>
            {/* Display shopping cart icon */}
            <BasketIcon />

            {/* Scrollable content for the restaurant screen */}
            <ScrollView className='relative '>
                <View>
                    {/* Display restaurant image */}
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url(),
                        }}
                        className='w-full h-56 bg-gray-300 p-4'
                    />

                    {/* Back button */}
                    <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
                        <ArrowLeftIcon size={20} color='#00CCBB' />
                    </TouchableOpacity>

                    {/* Restaurant details */}
                    <View className='bg-white'>
                        <View className='px-4 pt-4'>
                            <Text className='text-3xl font-bold'>{title}</Text>
                            <View className='flex-row space-x-2 my-1'>
                                <View className='flex-row items-center space-x-1'>
                                    <StarIcon color='green' opacity={0.5} size={22} />
                                    <Text className='text-xs text-gray-500'>
                                        <Text className='text-green-500'>{rating}</Text> . {genre}
                                    </Text>
                                </View>
                                <View className='flex-row items-center space-x-1'>
                                    <LocationMarkerIcon color='gray' opacity={0.4} size={22} />
                                    <Text className='text-xs text-gray-500'> {address}
                                    </Text>
                                </View>
                            </View>
                            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                        </View>

                        {/* Food allergy information */}
                        <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                            <QuestionMarkCircleIcon color='gray' size={20} opacity={0.6} />
                            <Text className='pl-2 flex-1 text-md font-bold'>Have a food allergy?</Text>
                            <ChevronRightIcon color='#00CCBB' />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Display restaurant menu */}
                <View className="pb-36">
                    <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
                    {dishes.map(dish => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default RestaurantScreen;
