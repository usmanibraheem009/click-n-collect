import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{title: 'Home', tabBarIcon: ({color}) => (
            < FontAwesome name='home' color={color} size={24}/>
        )
    }} />
        <Tabs.Screen name='cart' options={{title: 'Cart', tabBarIcon: ({color}) => (
            <FontAwesome name='cart-plus' color={color} size={24}/>
        )
    }} />
        <Tabs.Screen name='profile' options={{title: 'Profile', tabBarIcon: ({color}) => (
            <FontAwesome name='user' color={color} size={24}/>
        ), tabBarStyle : {}
    }} />
        <Tabs.Screen name='settings' options={{title: 'Settings', tabBarIcon: ({color}) => (
            <FontAwesome name='gear' color={color} size={24}/>
        )
    }} />
    </Tabs>
  )
}

export default _layout