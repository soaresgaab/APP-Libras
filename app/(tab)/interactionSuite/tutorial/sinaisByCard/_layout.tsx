import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Stack
      screenOptions={
        {
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
        }
      }
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
