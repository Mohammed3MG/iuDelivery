import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { HomeIcon } from 'react-native-heroicons/solid';
import { selectRestaurant } from '../features/restaurantSlice';
import { resetBasket } from '../features/basketSlice';



const DeliveryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const [distance, setDistance] = useState('Calculating...');

  const homeLocation = { latitude: 52.50768847543942, longitude: 13.294998226071066 };

  const clearBasketAndReturnHome = () => {
    dispatch(resetBasket());
    navigation.navigate('Home');
  };

  const calculatedDistance = useMemo(() => {

      const earthRadius = 6371;
      const { lat, long } = restaurant;
      const { latitude, longitude } = homeLocation;

      const dLat = (latitude - lat) * (Math.PI / 180);
      const dLon = (longitude - long) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat * (Math.PI / 180)) * Math.cos(latitude * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return (earthRadius * c).toFixed(2) + ' km';
  }, [restaurant, homeLocation]);

  useEffect(() => {
    setDistance(calculatedDistance);
  }, [calculatedDistance]);

  return (
    <View style={{ flex: 1, backgroundColor: '#00CCBB' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={{ flex: 1, marginTop: -10, zIndex: 0 }}
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
          <Text style={{ fontSize: 14, color: 'gray', paddingLeft: 5 }}>Distance to Restaurant</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>{distance}</Text>
        </View>
        <TouchableOpacity onPress={clearBasketAndReturnHome} style={{ right: -45, padding: 12, backgroundColor: '#34D399', borderRadius: 999, zIndex: 50 }}>
          <HomeIcon size={20} color='#FFFFFF' />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(DeliveryScreen);