import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import sanityClient from '../sanity';
import RestauranCards from './RestauranCards';

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);
    
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
            setRestaurants(data?.restaurants);
        });
    }, []);

    console.log(restaurants);

    return (
        <View>
            <View className='mt-4 flex-row items-centr justify-between px-4'>
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color='#00CCBB' />
            </View>

            <Text className='text-xs text-gray-500 px-4' >{description}</Text>
            
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,

                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {restaurants.map(restaurant => (
                    <RestauranCards
                    key ={restaurant._id}
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

                {/*Restaurant Cards */}
              

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default FeaturedRow;


