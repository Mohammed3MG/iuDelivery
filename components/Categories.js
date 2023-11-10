import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import sanityClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard';

// Define a functional component called Categories
const Categories = () => {
    // Declare a state variable to store the categories data
    const [categories, setCategories] = useState([]);

    // Use the useEffect hook to fetch data from the Sanity API when the component mounts
    useEffect(() => {
        // Fetch all documents of type "category" from the Sanity API
        sanityClient.fetch(`
            *[_type == "category"]
        `).then(data => {
            // Update the state variable with the fetched categories data
            setCategories(data);
        })
    }, []);

    // Render a ScrollView component to display a horizontal list of category cards
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsVerticalScrollIndicator={false}
        >
            {/* Map through the categories and render a CategoryCard for each category */}
            {categories.map((category) => (
                <CategoryCard
                    key={category._id}
                    imgUrl={urlFor(category.image).width(200).url()} // Set the image URL using the urlFor function
                    title={category.name} // Set the title of the category
                />
            )}
        </ScrollView>
    );
}

// Define the component's styles using StyleSheet.create
const styles = StyleSheet.create({})

// Export the Categories component
export default Categories;
