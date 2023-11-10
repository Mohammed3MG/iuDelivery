import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import sanityClient from '../sanity';
import RestauranCards from './RestauranCards';

// Define a functional component called FeaturedRow that takes 'id', 'title', and 'description' as props
const FeaturedRow = ({ id, title, description }) => {
    // Initialize 'restaurants' state as an empty array
    const [restaurants, setRestaurants] = useState([]);
    
    // Use the useEffect hook to fetch data from the sanityClient when the component mounts
    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id== $id ] {
            ...,
            restaurants[]-> {
              ...,
              dishes[]->,
              type -> {
                name
              } 
            },
          }[0]
        `, { id }
        ).then(data => {
            // Update the 'restaurants' state with the fetched data
            setRestaurants(data?.restaurants);
        });
    }, []);

    // Log the 'restaurants' state to the console
    console.log(restaurants);

    return (
        <View>
            {/* Render the title and an arrow icon for navigation */}
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color='#00CCBB' />
            </View>

            {/* Render the description of the featured row */}
            <Text className='text-xs text-gray-500 px-4' >{description}</Text>
            
            {/* Render a horizontal ScrollView for displaying restaurant cards */}
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {restaurants.map(restaurant => (
                    // Render individual RestaurantCards components for each restaurant
                    <RestauranCards
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        address={restaurant.address}    
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}

                {/* Comment: Additional restaurant cards can be added here */}
            </ScrollView>
        </View>
    );
}

// Define the component's styles using StyleSheet
const styles = StyleSheet.create({})

// Export the FeaturedRow component
export default FeaturedRow;
