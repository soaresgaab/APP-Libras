import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, View, Pressable } from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { router } from 'expo-router';
import { CreateButton } from '@/components/createData/create-Button';
import { searchAxiosGetWords } from '@/utils/axios/searchAxiosGet';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { TypeLibrasData } from '@/@types/LibrasData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState<TypeLibrasData[]>();
  const [refreshing, setRefreshing] = useState(true);

  async function searchData() {
    const response = await searchByRoute('word');
    setDataFetch(response.data);
  }

  useEffect(() => {
    searchData();
  }, []);

  function routePush(id: number) {
    router.push({
      pathname: '/(editionwords)/[words]',
      params: { id: `${id}` },
    });
  }
  {
    /* ---------------------- start of component return---------------------------- */
  }
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
          fontSize: 25,
          width: '75%',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        Palavras
      </Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#fcce9b' : '#e7503b',
          },
          styles.buttonTrash,
        ]}
        onPress={() => {
          searchData();
        }}
      >
        <MaterialCommunityIcons
          styles={styles.iconTrash}
          name="reload"
          size={25}
          color="white"
        />
      </Pressable>
      <CreateButton router="addWord" label="+ Incluir Palavra"></CreateButton>
      {data?.map((word, index) => (
        <Pressable key={index} onPress={() => routePush(word._id)}>
          <View style={styles.div}>
            <Text style={styles.labelWord}>{word.nameWord}</Text>
            <View style={styles.borda}></View>
            <View style={styles.divDescription}>
              <Text style={styles.labelDescription}>
                {word.wordDefinitions.length} definições
              </Text>
            </View>
          </View>
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
  labelWord: {
    marginTop: 3,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    width: '75%',
    fontWeight: 'bold',
    color: 'white',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    width: '95%',
    color: 'black',
  },
  div: {
    width: '80%',
    height: 80,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: '#e7503b',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e7503b',
  },
  divDescription: {
    width: '98%',
    height: 40,
    marginTop: 3,
    marginBottom: 4,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  borda: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 3,
    borderTopWidth: 2,
    borderTopColor: '#e7503b',
  },
  iconTrash: {},
  buttonTrash: {
    alignSelf: 'flex-end',
    width: 45,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: '5%',
  },
});

export default gestureHandlerRootHOC(App);
