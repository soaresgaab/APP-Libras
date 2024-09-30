import React from 'react';
import { Tabs, usePathname } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
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
  const pathCurrently = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
        },
      }}
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
        name="interactionSuite/search"
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
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="search"
              size={size}
              color={focused == true ? '#3e9677' : 'black'}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="interactionSuite/sendsuggestionn"
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
          tabBarIcon: ({ focused }) => {
            if (focused) return <SvgEmailGreen />;
            return <SvgEmail />;
          },
        }}
      />
      <Tabs.Screen
        name="screensCategory/camara"
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
        name="screensCategory/expressoesregionais"
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
      <Tabs.Screen
        name="interactionSuite/about"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="interactionSuite/tutorial"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/alfabeto"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/bairros"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/matematica"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/numeros"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/saudacoes"
        options={{ headerShown: false, href: null }}
      />

      <Tabs.Screen
        name="interactionSuite/viewsuggestion"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="screensCategory/vilas"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
