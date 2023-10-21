import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { firebase } from '../Firebase/Config';


const MyOrdersScreen = () => {

  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const todoRef = firebase.firestore().collection('myOrders').orderBy("createdAt","desc");

  useEffect(() => {
    const loadData = async () => {
      todoRef.onSnapshot(
      querySnapshot => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          const { items, total, createdAt } = doc.data()
          orders.push({
            id: doc.id,
            items,
            total,
            createdAt,
          })
        })
        setOrders(orders)
      }
    )
    };
    loadData();
  }, [])
  
  return (
   <>
   <Image
   source={ require('../assets/myOrders.png')}
    className='w-full h-56 bg-gray-300 p-4'
    />
    <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
    <ArrowLeftIcon size={20} color='#00CCBB' />
    </TouchableOpacity>
    <SafeAreaView className='flex-1 bg-white'>
   
        <View>
          
          <Text className='text-xl font-bold text-center p-3'>My Orders</Text>
          
        <FlatList
          data={orders}
          numColumns={1}
          renderItem={({item}) => (
            <View>
              <Text className='pl-4 pt-2 pb-2'>{
                new Date(item.createdAt.seconds * 1000).toLocaleDateString()
              }</Text>
              {item.items.map((names) => {
                
                  return (
                    <View key={Math.random()}>
                     
                      <View className='bg-white border-y border-gray-200'>
                        <View className='px-4 pt-4'>
                            <Text className='text-lg font-bold'> {names.name}</Text>
                            <View className='flex-row space-x-2 my-1'>
                                <View className='flex-row items-center space-x-1'>
                                    <Text className='text-base text-gray-500'>
                                        <Text className='text-green-500'>{names.price}€</Text>
                                    </Text>
                                </View>
                          </View>
                            {/* <Text className='text-gray-500 mt-2 pb-4'>{names.description}</Text> */}
                        </View>
                        
                      </View>  
                    </View>
                  )
                })}
              <Text className='text-green-500 text-lg font-bold pl-3 text-center p-4 bg-gray-100'>
                Total: {item.total} €
              </Text>
             </View>
           
          )}
          
        /> 
    </View>
      </SafeAreaView>
      </>
  )
}

export default MyOrdersScreen