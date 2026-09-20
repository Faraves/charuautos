import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#070a0f" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#070a0f' }
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
