import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import * as Progress from 'react-native-progress';
import MapView, { Marker, Polyline } from 'react-native-maps';

const DeliveryScreen = () => {
    const restaurant = useSelector(selectRestaurant);
    const homeLocation = { latitude: 52.50768847543942, longitude: 13.294998226071066 };
    const [distance, setDistance] = useState('Calculating...');

    useEffect(() => {
        // Calculate the distance between restaurant and home location using the Haversine formula
        const calculateDistance = () => {
            const earthRadius = 6371; // Earth's radius in kilometers
            const lat1 = restaurant.lat;
            const lon1 = restaurant.long;
            const lat2 = homeLocation.latitude;
            const lon2 = homeLocation.longitude;

            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);

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
                <Polyline
                    coordinates={[
                        { latitude: restaurant.lat, longitude: restaurant.long },
                        homeLocation,
                    ]}
                    strokeColor="#ee5253"
                    strokeWidth={6}
                />
                <Marker coordinate={homeLocation} pinColor="#ee5253" />
                <Marker
                    coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                />
            </MapView>

            <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 130 }}>
                <View>
                    <Text style={{ fontSize: 14, color: 'gray' , paddingLeft: 5}}>Distance to Restaurant</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>{distance}</Text>
                </View> 
                
                <Progress.Bar size={40} color="#00CCBB" indeterminate={true} />
                <Image source={{ uri: 'https://links.papareact.com/fls' }} style={{ width: 100, height: 100 }} />
             
            </SafeAreaView>
            
            {/* Additional UI elements for the rider information */}
        </View>
    );
};

export default DeliveryScreen;
