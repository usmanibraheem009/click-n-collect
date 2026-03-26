import { FontAwesome, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Provider } from 'react-native-paper'

const _layout = () => {
    return (
        <Provider>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name='index' options={{
                    title: 'Home', tabBarIcon: ({ color }) => (
                        < FontAwesome name='home' color={color} size={24} />
                    )
                }} />
                <Tabs.Screen name='shop' options={{
                    title: 'Shop', tabBarIcon: ({ color }) => (
                        <MaterialIcons name='shopping-cart' color={color} size={24} />
                    )
                }} />
                <Tabs.Screen name='bag' options={{
                    title: 'Bag', tabBarIcon: ({ color }) => (
                        <Fontisto name='shopping-bag' color={color} size={24} />
                    )
                }} />
                <Tabs.Screen name='favorites' options={{
                    title: 'Favorites', tabBarIcon: ({ color }) => (
                        <FontAwesome name='heart' color={color} size={24} />
                    )
                }} />
                <Tabs.Screen name='profile' options={{
                    title: 'Profile', tabBarIcon: ({ color }) => (
                        <FontAwesome name='user' color={color} size={24} />
                    ), tabBarStyle: {}
                }} />

            </Tabs>
        </Provider>
    )
}

export default _layout