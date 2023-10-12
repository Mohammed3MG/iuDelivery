import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const destination = { latitude: 52.50768847543942, longitude: 13.294998226071066 };
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [estimatedArrival, setEstimatedArrival] = useState('Calculating...');

    useEffect(() => {
        // Replace with your Google Maps Directions API key
        const apiKey = 'AIzaSyBU0AskPr6__PQEEllCpvJARY0DUjE3_Vs';

        // Fetch driving route data
        axios
            .get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${restaurant.lat},${restaurant.long}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${apiKey}`
            )
            .then((response) => {
                const route = response.data.routes[0];
                const overviewPolyline = route.overview_polyline.points;
                const decodedPoints = decodePolyline(overviewPolyline);
                setRouteCoordinates(decodedPoints);

                // Calculate estimated arrival time
                const duration = route.legs[0].duration.text;
                setEstimatedArrival(duration);
            })
            .catch((error) => {
                console.error('Error fetching route data:', error);
            });
    }, [restaurant, destination]);

    // Decode Google Maps Polyline
  // Decode Google Maps Polyline
function decodePolyline(encoded) {
    var poly = [];
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
  
    while (index < len) {
      var b, shift = 0, result = 0;
  
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      var dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;
  
      shift = 0;
      result = 0;
  
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      var dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;
  
      var point = { latitude: lat / 1e5, longitude: lng / 1e5 };
      poly.push(point);
    }
  
    return poly;
  }
  

    return (
        <View style={{ flex: 1, backgroundColor: '#00CCBB' }}>
            <SafeAreaView style={{ zIndex: 50 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <XIcon color="white" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'light' }}>My Orders</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10, padding: 30, zIndex: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.23, shadowRadius: 2, elevation: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space between' }}>
                        <View>
                            <Text style={{ fontSize: 18, color: 'gray' }}>Estimated Arrival</Text>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{estimatedArrival}</Text>
                        </View>
                        <Image source={{ uri: 'https://links.papareact.com/fls' }} style={{ width: 100, height: 100 }} />
                    </View>

                    <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

                    <Text style={{ marginTop: 10, color: 'gray' }}>
                        Your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                style={{ flex: 1, marginTop: -10, zIndex: 0 }}
                mapType='mutedStandard'
            >
                <Marker coordinate={routeCoordinates[0]} title={restaurant.title} description={restaurant.short_description} />
                <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]} pinColor='#ee5253' />
                <Polyline coordinates={routeCoordinates} strokeColor="#ee5253" strokeWidth={6} />
            </MapView>

            <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 100 }}>
                <Image source={{ uri: 'https://links.papareact.com/wru' }} style={{ width: 60, height: 60, backgroundColor: 'gray', padding: 15, borderRadius: 100, marginLeft: 15 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20 }}>Mohammed</Text>
                    <Text style={{ color: 'gray' }}>Your Rider</Text>
                </View>
                <Text style={{ color: '#00CCBB', fontSize: 20, marginRight: 15, fontWeight: 'bold' }}>Call</Text>
            </SafeAreaView>
        </View>
    );
};

export default DeliveryScreen;
