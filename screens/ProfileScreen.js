import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, UserIcon, } from 'react-native-heroicons/solid';
import MapView, { Marker } from 'react-native-maps';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView className='bg-white flex-1'>

        {/* Back button */}
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full z-50'>
          <ArrowLeftIcon size={20} color='#00CCBB' />
        </TouchableOpacity>

        <View className='items-center'>
          <View className='mt-10 pt-5'>
            <Image source={require('../assets/Logo_IUBH.png')} className='scale-5' />
          </View>

          <View className='border-2 rounded-full border-green-400 mt-5'>
            <UserIcon size={70} color='#00CCBB' />
          </View>

          <View className='mt-2'>
            <Text className='text-sky-900 font-bold text-lg text-center'>Mohammed Surguli</Text>
            <Text className='text-sky-900 font-bold text-lg text-center'>DoB: 15.1.1992</Text>
            <Text className='text-sky-900 font-bold text-lg text-center'>Matriculation No:</Text>
            <Text className='text-sky-900 font-bold text-lg text-center'>92105708</Text>
          </View>
        </View>

      </SafeAreaView>
    </>
  );
};

// Styles for components
const styles = StyleSheet.create({
  mainbox: {
    textAlign: 'center',
    margin: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  mapView: {
    flex: 3,
  },
});

export default ProfileScreen;
