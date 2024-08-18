import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: true, 
        headerTitleAlign: "center", 
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff", 
      }} >
      <Tabs.Screen name="(notes)" options={{ title: 'Notes' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="createNote" options={{ title: 'Create Note' }} />
    </Tabs>
  )
}