import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import sanityClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [caregories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "category"]
        `).then(data => {
            setCategories(data);
        })
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10, 
        }}
            horizontal
        showsVerticalScrollIndicator={false}
        >
            {caregories.map((category) => (
                <CategoryCard
                    key={category._id}
                    imgUrl={urlFor(category.image).width(200).url()}
                    title={category.name}
                />
          ))}
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default Categories;
