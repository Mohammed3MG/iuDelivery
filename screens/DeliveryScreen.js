import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
// import * as Progress from 'react-native-progress';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import { resetBasket } from '../features/basketSlice';
import { useDispatch } from 'react-redux';

const DeliveryScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const clearBasketAndReturnHome = () => {
        // Dispatch the resetBasket action to clear the basket
        dispatch(resetBasket());
    
        // Navigate back to the home screen
        navigation.navigate('Home');
      };
    // Get restaurant data from Redux store
    const restaurant = useSelector(selectRestaurant);
    
    // Define home location with latitude and longitude
    const homeLocation = { latitude: 52.50768847543942, longitude: 13.294998226071066 };

    // State to store the calculated distance between restaurant and home location
    const [distance, setDistance] = useState('Calculating...');

    // Calculate the distance using the Haversine formula when the component mounts
    useEffect(() => {
        const calculateDistance = () => {
            const earthRadius = 6371; // Earth's radius in kilometers
            const lat1 = restaurant.lat;
            const lon1 = restaurant.long;
            const lat2 = homeLocation.latitude;
            const lon2 = homeLocation.longitude;

            // Convert latitude and longitude to radians
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);

            // Haversine formula calculations
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const calculatedDistance = earthRadius * c;

            // Update the state with the calculated distance
            setDistance(calculatedDistance.toFixed(2) + ' km');
        };

        calculateDistance();
    }, [restaurant, homeLocation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#00CCBB' }}>
            <TouchableOpacity  onPress={clearBasketAndReturnHome} className='absolute top-14 left-5 p-2 bg-emerald-400 rounded-full z-50'>
                <ArrowLeftIcon size={20} color='#FFFFFF' />
            </TouchableOpacity>

            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                style={{ flex: 1, marginTop: -10, zIndex: 0 }}
                mapType="mutedStandard"
            >
                {/* Show a Polyline connecting the restaurant and home location */}
                <Polyline
                    coordinates={[
                        { latitude: restaurant.lat, longitude: restaurant.long },
                        homeLocation,
                    ]}
                    strokeColor="#ee5253"
                    strokeWidth={6}
                />
                {/* Show a Marker for the home location */}
                <Marker coordinate={homeLocation} pinColor="#ee5253" />
                {/* Show a Marker for the restaurant with title and description */}
                <Marker
                    coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                />
            </MapView>

            <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 130 }}>
                <View>
                    <Text style={{ fontSize: 14, color: 'gray', paddingLeft: 5 }}>Distance to Restaurant</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>{distance}</Text>
                </View>
                
                {/* Display a loading indicator */}
                {/* <Progress.Bar size={40} color="#00CCBB" indeterminate={true} /> */}

                {/* Display an image (e.g., rider) */}
                <Image source={require('../assets/giphy.webp')} style={{ width: 100, height: 100 }} />
            </SafeAreaView>
        </View>
    );
};

export default DeliveryScreen;
