import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="category/add" options={{ headerShown: false }} />
      <Stack.Screen name="category/index" options={{ headerShown: false }} />
      <Stack.Screen name="words/addWord" options={{ headerShown: false }} />
      <Stack.Screen name="words/addSinal" options={{ headerShown: false }} />
      <Stack.Screen name="words/index" options={{ headerShown: false }} />
      <Stack.Screen name="words/[word]" options={{ headerShown: false }} />
    </Stack>
  );
}
