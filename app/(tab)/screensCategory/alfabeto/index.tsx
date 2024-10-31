import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
import Separator from '@/components/libras_componentes/separator';
import { AlfabetoContainer } from '@/components/libras_alfabeto_manual/alfabeto_container';
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
          marginTop: 95,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 26,
          width: '90%',
          fontWeight: 'bold',
          color: '#03459e',
        }}
      >
        Alfabeto manual
      </Text>
      <Separator marginTopProp={15} marginBottomProp={10}></Separator>
      <AlfabetoContainer />
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
  separator: {
    width: '90%',
    marginTop: 19,
    marginBottom: 22,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#cac9c99c',
  },
});

export default gestureHandlerRootHOC(App);
