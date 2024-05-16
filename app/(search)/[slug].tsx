import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import MonthYear from '@/components/formSearch/monthAndYear';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { searchAxiosGet } from '@/components/axios/searchAxiosGet';
import { TypeLibrasData, TypeLibrasDataSinais } from '@/@types/LibrasData';
import { NoResultsComponent } from '@/components/formSearch/erroSearch';
import { Image } from 'expo-image';
import { DataLibrasReducer } from '@/utils/reducer/DataLibrasReducer';
import { initialStateDataLibrasReducer } from '../../utils/reducer/DataLibrasReducer';

function App() {
  const [data, setData] = useState<TypeLibrasData[]>();
  const [updatedData, dispatchUpdateData] = useReducer(
    DataLibrasReducer,
    initialStateDataLibrasReducer,
  );
  const [refreshing, setRefreshing] = useState(true);
  const { slug } = useLocalSearchParams();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  async function searchData() {
    const response = await searchAxiosGet();
    if (response.data) {
      response.data.map((item: TypeLibrasData) => {
        dispatchUpdateData({
          type: 'added',
          payload: item,
        });
      });
      setData(response.data);
    }
  }

  useEffect(() => {
    searchData();
    console.log(data);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <MonthYear></MonthYear>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 18,
          width: '95%',
        }}
      >
        {`Confira alguns significados para a palavra "${slug}" e seus respectivos sinais`}
      </Text>
      <Pressable
        onPress={() => {
          console.log(updatedData);
        }}
      >
        {updatedData &&
          updatedData.map((item, index) => (
            <TextInput key={index} value={item.nameWord}></TextInput>
          ))}

        <Text> Aperta ae</Text>
      </Pressable>
      {data &&
        data.map((item: TypeLibrasData, index: number) => (
          <View key={`inner_${index}`}>
            <Text
              style={{
                marginTop: 30,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 20,
                width: '75%',
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              {item.nameWord !== null ? item.nameWord : 'oi'}
            </Text>

            {data &&
              item.wordDefinitions.map(
                (item: TypeLibrasDataSinais, innerindex: number) => (
                  <View key={`outer_${index}${innerindex}`}>
                    <Image
                      style={styles.image}
                      source={item.src}
                      contentFit="cover"
                      placeholder={{ blurhash }}
                      transition={1000}
                    />
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
                      {`Categoria: ${
                        item.category.nameCategory !== null
                          ? item.category.nameCategory
                          : 'oi'
                      }`}
                    </Text>

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
                      {item.descriptionWordDefinition !== null
                        ? item.descriptionWordDefinition
                        : 'oi'}
                    </Text>
                  </View>
                ),
              )}
          </View>
        ))}
      {!data && <NoResultsComponent slug={slug}></NoResultsComponent>}
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
  image: {
    width: 290,
    height: 280,
    marginTop: 18,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: 15,
  },
});

export default gestureHandlerRootHOC(App);
