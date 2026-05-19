import useGreetings from '@/src/hooks/useGreeetings'
import { useTheme } from '@/src/hooks/useTheme'
import { mS } from '@/src/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const _layout = () => {
    const { theme } = useTheme();
    const greetings = useGreetings();
    return (
        <GestureHandlerRootView>

            <Drawer screenOptions={{
                drawerStyle: {
                    backgroundColor: theme.background.secondary,
                    borderTopColor: theme.border.primary,
                    paddingTop: 5
                },
                headerStyle: {
                    backgroundColor: theme.background.primary,
                },
                headerTintColor: theme.text.primary,

                drawerActiveTintColor: theme.surface.primary,
                drawerInactiveTintColor: theme.text.secondary
            }}>
                <Drawer.Screen name='index' options={{
                    title: 'Dashboard', headerTitle: `${greetings}`,
                    headerTitleStyle: { color: theme.text.secondary, fontSize: mS(18) }, drawerIcon: ({ color, focused }: any) => (<Ionicons name={focused ? 'grid' : 'grid-outline'} color={color} size={24} />)
                }} />
                <Drawer.Screen name='products' options={{ title: 'Products', drawerIcon: ({ color, focused }: any) => (<Ionicons name={focused ? 'list' : 'list-outline'} color={color} size={24} />) }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default _layout