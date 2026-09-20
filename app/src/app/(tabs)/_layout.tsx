import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0c121d',
          borderTopColor: 'rgba(0, 242, 254, 0.15)',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarActiveTintColor: '#00f2fe',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Matchmaker',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🎯</Text>
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Diagnóstico OBD2',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚠️</Text>
        }}
      />
      <Tabs.Screen
        name="compare"
        options={{
          title: 'Comparador & PDF',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📄</Text>
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: 'Mi Carro',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚗</Text>
        }}
      />
    </Tabs>
  );
}
