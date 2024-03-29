import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import LoginScreen from './screens/LoginScreen';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat';
import { Provider as PaperProvider } from 'react-native-paper';

// Create a navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  // State to keep track of the user's authentication status
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in user authentication status
    const unsubscribe = firebase.auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

    return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <TailwindProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? ( // Check if the user is authenticated
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen}
                    options={{ presentation: 'modal', headerShown: false }}
                  />
                  <Stack.Screen name="Location" component={LocationScreen} />
                  <Stack.Screen name="Restaurant" component={RestaurantScreen} />
                  <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
                  <Stack.Screen name="Basket" component={BasketScreen}
                    options={{ presentation: 'modal', headerShown: false }}
                  />
                  <Stack.Screen name='PreparingOrderScreen' component={PreparingOrderScreen}
                    options={{ presentation: 'fullScreenModal', headerShown: false }}
                  />
                  <Stack.Screen name='Delivery' component={DeliveryScreen}
                    options={{ presentation: 'fullScreenModal', headerShown: false }}
                  />
                </>
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} /> // Show the Login screen if the user is not authenticated
              )}
            </Stack.Navigator>
          </TailwindProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
