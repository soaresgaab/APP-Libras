import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, Dimensions } from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import { AlfabetoContainer } from '@/components/libras_alfabeto_manual/alfabeto_container';
import { Libras_numeros_container } from '@/components/libras_numeros_manual/Libras_numeros_container';
import { Libras_saudacoes_container } from '@/components/libras_saudacoes_manual/Libras_saudacoes_container';
import { Libras_matematica_container } from '@/components/libras_matematica_manual/Libras_matematica_manual';
import { Libras_regional_container } from '@/components/libras_expregionais_manual/Libras_expregionais_manual';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <Text
        style={{
          marginTop: isTablet ? 164 : 122,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 26,
          width: '75%',
          fontWeight: 'bold',
          color: '#03459e',
        }}
      >
        Câmara municipal de Marabá
      </Text>
      <Libras_regional_container />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf8f4',
    width: 'auto',
    paddingVertical: 0,
  },
});

export default gestureHandlerRootHOC(App);
