import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {ArrowLeftIcon, UserIcon} from 'react-native-heroicons/solid';
import MapView, {Marker} from 'react-native-maps';

const LocationScreen = () => {
    // Get the navigation object
    const navigation = useNavigation();

    return (
        <View style={styles.mainbox}>
            {/* Button to go back to the previous screen */}
            <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full z-50'>
                <ArrowLeftIcon size={20} color='#00CCBB' />
            </TouchableOpacity>
            
            <MapView
                style={styles.mapView}
                customMapStyle={customStyle}
                userLocationCalloutEnabled={true}
                initialRegion={{
                    latitude:   52.507685210356364,
                    longitude: 13.295041141359507,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
            >
                <Marker
                    coordinate={{
                        latitude:   52.507685210356364,
                        longitude: 13.295041141359507,
                    }}
                    title='Berlin'
                    identifier='origin'
                    pinColor='#ee5253'
                />
            </MapView>
        </View>
    );
}
const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffb606',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffb606',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#00ff00',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const styles = StyleSheet.create({
    mainbox:{
      textAlign:'center',
      margin: 0,
      flex: 5,
      justifyContent: 'space-between',
    },
    mapView:{
      flex: 25,
    }
  });
export default LocationScreen
