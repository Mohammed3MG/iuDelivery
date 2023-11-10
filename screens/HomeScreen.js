import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArchiveIcon, SearchIcon, UserIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import { LocationMarkerIcon } from 'react-native-heroicons/solid';

const HomeScreen = () => {
  // Get the navigation object
  const navigation = useNavigation();

  // State to store featured categories data
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // Hide the header of the screen using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Fetch featured categories data from sanity and update the state
  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == "featured"] {
        ...,
        restaurants[]-> {
          ...,
          dishes[]->
        },
      }
      `
    ).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className='bg-white pt-5'>
      {/* Home Header Section */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image source={{
          uri: "https://links.papareact.com/wru"
        }}
          className='h-7 w-7 bg-grey-300 p-4 rounded-full'
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Location')}>
            <Text className="font-bold">
              Suarezstraße 15, 14057, Berlin
              <LocationMarkerIcon size={20} color="#00CCBB" />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <UserIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row space-x-2 bg-gray-200 p-3 flex-1'>
          <SearchIcon color="gray" />
          <TextInput placeholder='Type your search here...' keyboardType='default' />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
          <ArchiveIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      <ScrollView className='flex-1 bg-gray-100'
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Display category navigation components */}
        <Categories />
        
        {/* Display featured rows based on fetched data */}
        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
