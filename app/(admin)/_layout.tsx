import { useTheme } from '@/src/hooks/useTheme'
import { mVs } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Provider } from 'react-native-paper'

const _layout = () => {
    const { theme } = useTheme();
    return (
        <Provider>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.background.primary,
                    borderTopColor: 'transparent',
                    height: mVs(70),
                    paddingTop: 5
                },
                tabBarActiveTintColor: theme.surface.primary,
                tabBarInactiveTintColor: theme.text.disabled
            }}>
                <Tabs.Screen name='index' options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (< Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />) }} />
                <Tabs.Screen name='products' options={{ title: 'Products', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'cart' : 'cart-outline'} color={color} size={24} />) }} />
                <Tabs.Screen name='me' options={{ title: 'Me', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />) }} />
            </Tabs>
        </Provider>
    )
}

export default _layout