import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import { AlfabetoContainer } from '@/components/libras_alfabeto_manual/alfabeto_container';
import { Libras_numeros_container } from '@/components/libras_numeros_manual/Libras_numeros_container';
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
        Números
      </Text>
      <Libras_numeros_container/>
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
