import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs, usePathname } from 'expo-router';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  SvgCamara,
  SvgExpressaoRegional,
} from '@/components/libras_componentes/image-icon-drawer';
import {
  SvgEmail,
  SvgEmailGreen,
} from '@/components/libras_componentes/icon-email';
import {
  SVGCamaraGreen,
  SvgExpressaoRegionalGreen,
} from '@/components/libras_componentes/image-icon-tab-green';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathCurrently = usePathname();

  return (
    <Tabs
      screenOptions={
        {
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: 'Início',
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 3,
            color: pathCurrently == '/' ? '#3e9677' : 'black',
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={focused == true ? '#3e9677' : 'black'}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen name="auth" options={{ headerShown: false, href: null }} />
      <Tabs.Screen
        name="edition"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="editionwords"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarLabel: 'Pesquisar',
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 3,
            color: pathCurrently == '/search' ? '#3e9677' : 'black',
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="search"
              size={size}
              color={focused == true ? '#3e9677' : 'black'}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="sendsuggestionn"
        options={{
          headerShown: false,
          tabBarLabel: 'Sugestão',
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 3,
            color: pathCurrently == '/sendsuggestionn' ? '#3e9677' : 'black',
          },
          tabBarIconStyle: {
            marginLeft: -12,
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <SvgEmailGreen />;
            return <SvgEmail />;
          },
        }}
      />
      <Tabs.Screen
        name="camara"
        options={{
          headerShown: false,
          tabBarLabel: 'Câmara',
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 3,
            color: pathCurrently == '/camara' ? '#3e9677' : 'black',
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <SVGCamaraGreen />;
            return <SvgCamara />;
          },
        }}
      />
      <Tabs.Screen
        name="expressoesregionais"
        options={{
          headerShown: false,
          tabBarLabel: 'Regionais',
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 3,
            color:
              pathCurrently == '/expressoesregionais' ? '#3e9677' : 'black',
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <SvgExpressaoRegionalGreen />;
            return <SvgExpressaoRegional />;
          },
        }}
      />
      <Tabs.Screen name="about" options={{ headerShown: false, href: null }} />
      <Tabs.Screen
        name="alfabeto"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="bairros"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="matematica"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="numeros"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="personalize"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="saudacoes"
        options={{ headerShown: false, href: null }}
      />

      <Tabs.Screen
        name="viewsuggestion"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen name="vilas" options={{ headerShown: false, href: null }} />
    </Tabs>
  );
}
