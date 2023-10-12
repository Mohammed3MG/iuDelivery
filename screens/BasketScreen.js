import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { firebase } from '../Firebase/Config';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    const todo = firebase.firestore().collection('myOrders');
    
    const addField = () => {
        const data = {
            total: basketTotal,
            items: items,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        todo.add(data)

    }

    const navScreen = () => {
     navigation.navigate('PreparingOrderScreen');
    }
    const onPress = () => {
        navScreen();
        addField();
    }
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 bg-gray-100'>
            <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
             <View>
                <Text className="text-lg font-bold text-center">Basket</Text>     
                <Text className="text-center text-gray-400">
                {restaurant.title}            
                </Text>
             </View>   

                  <TouchableOpacity onPress={navigation.goBack}
                      className='rounded-full bg-gray-100 absolute top-3 right-5'>
                    <XCircleIcon color='#00CCBB' height={50} width={50} />
                </TouchableOpacity>
              </View>
              
              <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                  <Image
                      source={{
                      uri: "https://links.papareact.com/wru",
                      }}
                      className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                  />
                <Text className="flex-1">Deliver in 25-30 min</Text>
                  <TouchableOpacity>
                      <Text className="text-[#00CCBB]">Change</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView className='divide-y divide-gray-300'>
                  {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                      <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-2'>
                          <Text className='text-[#00CCBB]'>{items.length} x</Text>
                          
                          <Image
                              source={{
                                  uri: urlFor(items[0]?.image).url()
                              }}
                              className="h-12 w-12 row-span-full"
                          />
                          <Text className='flex-1'>{items[0]?.name}</Text>
                          
                          <Text className='text-gray-600'>
                              <Currency quantity={items[0]?.price} currency='EUR'/>
                          </Text>

                          <TouchableOpacity>
                              <Text className='text-[#00CCBB]'
                              onPress={() => dispatch(removeFromBasket({id: key}))}
                              >
                                  Remove
                              </Text>
                          </TouchableOpacity>
                      </View>
                  ))}
              </ScrollView>

              <View className='p-5 bg-white mt-5 space-y-4'>
                  <View className='flex-row justify-between'>
                      <Text className='text-gray-400'>Subtotal</Text>
                      <Text className='text-gray-400'>
                      <Currency quantity={basketTotal} currency='EUR'/>
                      </Text>
                  </View>

                  <View className='flex-row justify-between'>
                      <Text className='text-gray-400'>Delivery Fee</Text>
                      <Text className='text-gray-400'>
                      <Currency quantity={1.5} currency='EUR'/>
                      </Text>
                  </View>

                  <View className='flex-row justify-between'>
                      <Text>Order Total</Text>
                      <Text className='font-extrabold'>
                      <Currency quantity={basketTotal + 1.5} currency='EUR'/>
                      </Text>
                  </View>

                  <TouchableOpacity onPress={onPress} className='rounded-lg bg-[#00CCBB] p-4'>
                      <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                  </TouchableOpacity>

              </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen;