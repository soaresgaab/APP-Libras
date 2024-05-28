import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';
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
      <SearchInput></SearchInput>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        Dicionário da Língua Brasileira de Sinais
      </Text>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          // fontFamily: 'OMEGLE',
        }}
      >
        Uma visão regional: Marabá
      </Text>
      <AlfabetoButton />
      <CoresButton router={'Números'} label={'Números'} />
      <CoresButton router={'(search)/123'} label={'Calendários'} />
      <CoresButton router={'Redes de Comp.'} label={'Redes de Comp.'} />
      <CoresButton router={'Cores'} label={'Cores'} />
      <CoresButton router={'Cumprimentos'} label={'Cumprimentos'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    width: 'auto',
    paddingVertical: 0,
  },
});

export default gestureHandlerRootHOC(App);
