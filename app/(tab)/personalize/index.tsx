import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
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
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

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
  function routePushAdd(id: number) {
    router.push({
      pathname: '/(editionwords)/addWord',
      params: { id: `${id}` },
    });
  }

  function routePushAddSinal(id: number) {
    router.push({
      pathname: '/(editionwords)/addSinal',
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
          marginBottom: 30,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 25,
          width: '75%',
          fontWeight: 'bold',
        }}
      >
      Gerenciamento
      </Text>
      <Link href={`/editionwords`} asChild>
        <Pressable style={styles.direction}>
          <Text style={styles.label}>Palavras</Text>
        </Pressable>
      </Link>
      <Link href={`/edition`} asChild>
        <Pressable style={styles.direction}>
          <Text style={styles.label}>Categoria</Text>
        </Pressable>
      </Link>
      {/*{data?.map((word, index) => (
        <Pressable key={index} onPress={() => {}}>
          <View style={styles.div}>
            <Text style={styles.labelWord}>{word.nameWord}</Text>
            <View style={styles.borda}></View>
            <View style={styles.divDescription}>
              <Text style={styles.labelDescription}>
                {word.wordDefinitions.length} definições
              </Text>
              <View style={styles.divButton}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#fcce9b' : '#e7503b',
                    },
                    styles.buttonEdit,
                  ]}
                  onPress={() => {
                    routePushAddSinal(word._id);
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 20,
                      width: '65%',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Adicionar
                  </Text>
                  <Entypo name="plus" size={25} color="white" />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#fcce9b' : '#e7503b',
                    },
                    styles.buttonEdit,
                  ]}
                  onPress={() => {
                    routePush(word._id);
                  }}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 20,
                      width: '65%',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Editar
                  </Text>
                  <Feather name="edit-3" size={25} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      ))}*/}
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
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '400',
    width: '95%',
    color: 'black',
  },
  div: {
    width: isTablet ? '85%' : '95%',
    height: 150,
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
    height: 105,
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
  buttonReload: {
    alignSelf: 'flex-end',
    width:300,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 'auto',
    flexDirection: 'row',
    alignContent: 'center',
    borderTopColor: '#fcce9b',
  },
  buttonEdit: {
    alignSelf: 'flex-end',
    width: isTablet ? '40%' : '48%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  divButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  direction: {
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  label: {
    marginTop: -30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e7503b',
    backgroundColor: '#e7d75d',
    borderRadius: 20,
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default gestureHandlerRootHOC(App);
