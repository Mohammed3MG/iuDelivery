import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define a functional component called DrawerContent
const DrawerContent = () => {
  // Use the useNavigation hook to access the navigation object
  const navigation = useNavigation();

  // Function to navigate to the 'Profile' screen
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
    
  // Function to navigate to the 'MyOrders' screen
  const navigateToMyOrders = () => {
    navigation.navigate('MyOrders');
  };

  return (
    <View>
      {/* Render a touchable component to navigate to the 'Profile' screen when pressed */}
      <TouchableOpacity onPress={navigateToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      {/* Render a touchable component to navigate to the 'MyOrders' screen when pressed */}
      <TouchableOpacity onPress={navigateToMyOrders}>
        <Text>My Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

// Export the DrawerContent component
export default DrawerContent;
