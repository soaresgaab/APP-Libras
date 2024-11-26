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
import { TypeCategory } from '@/@types/Category';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState<TypeCategory[]>();
  const [refreshing, setRefreshing] = useState(true);

  async function searchData() {
    const response = await searchByRoute('category');
    response.data;
    setDataFetch(response.data);
  }

  useEffect(() => {
    searchData();
  }, []);

  function routePush(id: number) {
    router.push({
      pathname: '/(edition)/[id]',
      params: { id: `${id}` },
    });
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
        Categorias
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
      <CreateButton router="add" label="+ Incluir Categoria"></CreateButton>
      {data?.map((category, index) => (
        <Pressable key={index}>
          <View style={styles.div}>
            <Text style={styles.labelCategory}>{category.nameCategory}</Text>
            <View style={styles.borda}></View>
            <ScrollView style={styles.divDescription}>
              <Text style={styles.labelDescription}>
                {category.descriptionCategory}
              </Text>
            </ScrollView>
            <View style={styles.divButton}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#fcce9b' : '#3d9577',
                  },
                  styles.buttonEdit,
                ]}
                onPress={() => {
                  routePush(category._id);
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 20,
                    width: '65%',
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Editar
                </Text>
                <Feather
                  style={styles.iconEditDescription}
                  name="edit"
                  size={27}
                  color="black"
                />
              </Pressable>
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
    backgroundColor: '#edf8f4',
    width: 'auto',
    paddingVertical: 0,
  },
  labelCategory: {
    marginTop: 3,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    width: '75%',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
  },
  divButton: {
    // marginTop: 3,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 60,
    fontWeight: 'bold',
    color: 'white',
    // backgroundColor: 'blue',
  },
  labelDescription: {
    alignSelf: 'center',
    textAlign: 'justify',
    fontSize: 19,
    width: '95%',
    color: 'black',
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
  divDescription: {
    width: '98%',
    height: 2,
    marginTop: 3,
    marginBottom: 5,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
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
  buttonEdit: {
    alignSelf: 'center',
    width: isTablet ? '40%' : '48%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  iconEditDescription: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default gestureHandlerRootHOC(App);
