import useTheme from '@/src/hooks/useTheme';
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.primary,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login-screen" />
      <Stack.Screen name="signup-screen" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
