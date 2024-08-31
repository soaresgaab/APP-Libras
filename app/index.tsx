import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { CardButton } from '@/components/libras_componentes/card-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';
import { searchByRoute } from '@/utils/axios/searchByRote';
import {
  View,
  Pressable,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768 && height >= 1024;

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  async function searchData() {
    const response = await searchByRoute('category_showInMenu');
    console.log(response.data);
    setDataFetch(response.data);
  }

  useEffect(() => {
    // fetchData();
    searchData();
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
     {/* <AlfabetoButton />
      <CoresButton router={'(expregional)'} label={'Expressões Regionais'} />
      <CoresButton router={'(matematica)'} label={'Matemática'} />
      <CoresButton router={'(numeros)'} label={'Números'} />
      {/* <CoresButton router={'(search)/123'} label={'Calendários'} /> */}
     {/* <CoresButton router={'(saudacoes)'} label={'Saudações'} />
      <CoresButton router={'(sinais)'} label={'Sinais'} />*}

      {/* <CoresButton router={'/'} label={'Cumprimentos'} /> */}
      {data?.map((category, index) => (
        <Pressable key={index}>
          <CardButton router={'(sinais)'} label={category.nameCategory} img={category.imgCategory}/>
        </Pressable>
      ))}
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
  div: {
    width: isTablet ? '80%' : '95%',
    height: 200,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: '#e7503b',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e7503b',
  },
});

export default gestureHandlerRootHOC(App);
