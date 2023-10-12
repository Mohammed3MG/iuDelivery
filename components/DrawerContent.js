import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
    
  const navigateToMyOrders = () => {
    navigation.navigate('MyOrders');
  };

    
  return (
    <View>
      <TouchableOpacity onPress={navigateToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToMyOrders}>
        <Text>My Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
