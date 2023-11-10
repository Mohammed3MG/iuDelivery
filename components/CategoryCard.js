import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// Define a functional component called CategoryCard that receives imgUrl and title as props
const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity className='relative mr-2'>
            {/* Render an image with the source URL provided in imgUrl prop */}
            <Image source={{
                uri: imgUrl,
            }}
            // Apply styling to the image component
            className='h-20 w-20 rounded'
            />
            {/* Render a text element with the title provided in the title prop */}
            <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
        </TouchableOpacity>
    );
}

// Define the component's styles using StyleSheet.create
const styles = StyleSheet.create({})

// Export the CategoryCard component
export default CategoryCard;