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
                {routeCoordinates.length > 0 ? (
                <>
                <Marker
                coordinate={routeCoordinates[0]}
                title={restaurant.title}
                description={restaurant.short_description}
                />
                <Marker
                coordinate={routeCoordinates[routeCoordinates.length - 1]}
                pinColor='#ee5253'
                />
                <Polyline coordinates={routeCoordinates} strokeColor="#ee5253" strokeWidth={6} />
                </>
                ) : null}

            </MapView>


            <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 100 }}>
            
                  
            <View>
            <Text style={{ fontSize: 14, color: 'gray' }}>Estimated Arrival</Text>
                    {<Text style={{ fontSize: 18, fontWeight: 'bold'}}>{estimatedArrival}</Text>}
                </View>
                {<Progress.Bar size={40} color="#00CCBB" indeterminate={true}  style={{marginLeft:20}}/>}
                { <Image source={{ uri: 'https://links.papareact.com/fls' }} style={{ width: 100, height: 100 }} />}

            </SafeAreaView>

            <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 100 }}>
                <Image source={{ uri: 'https://links.papareact.com/wru' }} style={{ width: 60, height: 60, backgroundColor: 'gray', padding: 15, borderRadius: 100, marginLeft: 15 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20 }}> Mohammed</Text>
                    <Text style={{ color: 'gray' }}> Your Rider</Text>
                </View>
                <Text style={{ color: '#00CCBB', fontSize: 20, marginRight: 15, fontWeight: 'bold' }}>Call</Text>
            </SafeAreaView>
        </View>
    );
};

export default DeliveryScreen;
