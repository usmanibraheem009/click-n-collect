import ScreenHeader from '@/src/components/layout/screen-header'
import ScreenWrapper from '@/src/components/layout/screen-wrapper'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const favorites = () => {

  const favorites = useSelector((state: any) => state.favoritesReducer.favorites);

  return (
    <ScreenWrapper>
      <ScreenHeader searchIcon />
      <FlatList data={favorites} keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )} />
    </ScreenWrapper>
  )
}

export default favorites

const styles = StyleSheet.create({})