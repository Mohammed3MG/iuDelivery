import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  // Use useEffect to navigate to the 'Delivery' screen after a delay
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 1000); // You can adjust the delay as needed (1 second in this case)
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#00CCBB', justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.View animation="slideInUp" iterationCount={1}>
        <Image
          source={require('../assets/OrderFood.gif')}
          style={{ width: 200, height: 200 }}
        />
      </Animatable.View>
      <Animatable.Text animation="slideInUp" iterationCount={1} style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
        Waiting for the restaurant to accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
