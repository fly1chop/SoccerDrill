import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from './pages/About';
import Random from './pages/Random';
import Search from './pages/Search';
import Videos from './pages/Videos';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RecoilRoot } from 'recoil';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {

  const navigationRef = React.createRef();

  return (
    <RecoilRoot>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerTitleAlign: 'left',
              tabBarIcon: ({ focused, color, size }) =>
                focused ? (
                  <Ionicons
                    name="home"
                    size={hp(3)}
                    color={color}
                  />
                )
                  :
                  (
                    <Ionicons
                      name="home-outline"
                      size={hp(3)}
                      color={color}
                    />
                  ),
                headerTitle: () => (
                  <Image 
                    source={require('./assets/logo_top.png')}
                    style={{
                      height: hp(15),
                      width: wp(30)
                    }}
                    resizeMode={'contain'}
                  />
                )
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              headerTitleAlign: 'left',
              tabBarIcon: ({ focused, color, size }) =>
                focused ? (
                  <Ionicons
                    name="search"
                    size={hp(3)}
                    color={color}
                  />
                )
                  :
                  (
                    <Ionicons
                      name="search-outline"
                      size={hp(3)}
                      color={color}
                    />
                  ),
                  headerTitle: () => (
                    <Image 
                      source={require('./assets/logo_top.png')}
                      style={{
                        height: hp(15),
                        width: wp(30)
                      }}
                      resizeMode={'contain'}
                    />
                  )
            }}
          />
          <Tab.Screen
            name="Random"
            component={Random}
            options={{
              headerTitleAlign: 'left',
              tabBarIcon: ({ focused, color, size }) =>
                focused ? (
                  <Ionicons
                    name="shuffle"
                    size={hp(3)}
                    color={color}
                  />
                )
                  :
                  (
                    <Ionicons
                      name="shuffle-outline"
                      size={hp(3)}
                      color={color}
                    />
                  ),
                  headerTitle: () => (
                    <Image 
                      source={require('./assets/logo_top.png')}
                      style={{
                        height: hp(15),
                        width: wp(30)
                      }}
                      resizeMode={'contain'}
                    />
                  )
            }}
          />
          <Tab.Screen
            name="About"
            component={About}
            options={{
              headerTitleAlign: 'left',
              tabBarIcon: ({ focused, color, size }) =>
                focused ? (
                  <Ionicons
                    name="information-circle"
                    size={hp(3)}
                    color={color}
                  />
                )
                  :
                  (
                    <Ionicons
                      name="information-circle-outline"
                      size={hp(3)}
                      color={color}
                    />
                  ),
                  headerTitle: () => (
                    <Image 
                      source={require('./assets/logo_top.png')}
                      style={{
                        height: hp(15),
                        width: wp(30)
                      }}
                      resizeMode={'contain'}
                    />
                  )
            }}
          />
          <Tab.Screen 
            name="Videos"
            component={Videos}
            options={{
              headerTitleAlign: 'left',
              tabBarButton: () => null,
              headerTitle: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons 
                    name="arrow-back-outline"
                    color="black"
                    size={hp(3)}
                    onPress={() => {
                      navigationRef.current?.dispatch(CommonActions.goBack());
                    }}
                  />
                  <Image 
                    source={require('./assets/logo_top.png')}
                    style={{
                      width: wp(30)
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0CA9B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// Make two buttons
// One button, the title is "Plus"
// One button, the title is "Minus"
// If you press the Plus button, the number increases by one.
// If you press the Minus button, the number decreases by one.