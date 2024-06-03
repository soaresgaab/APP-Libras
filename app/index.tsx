import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';

import { View } from 'react-native';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <Text className="text-slate-800">Try editing me! 🎉</Text>
    </View>
  );
};

export default gestureHandlerRootHOC(App);
