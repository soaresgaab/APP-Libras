import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import MonthYear from '@/components/formSearch/monthAndYear';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { searchAxiosGet } from '@/components/axios/searchAxiosGet';
import { TypeLibrasData, TypeLibrasDataSinais } from '@/@types/LibrasData';
import { NoResultsComponent } from '@/components/formSearch/erroSearch';

function App() {
  const [data, setData] = useState<TypeLibrasData>();
  const [refreshing, setRefreshing] = useState(true);
  const { slug } = useLocalSearchParams();
  console.log(slug);
  async function searchData() {
    const response = await searchAxiosGet();
    console.log(response.data);
    if (response.data) {
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
      {data !== undefined ? (
        data.sinais.map((item: TypeLibrasDataSinais, index: number) => (
          <Text
            key={index}
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
            {item.description !== null ? item.description : 'oi'}
          </Text>
        ))
      ) : (
        <NoResultsComponent slug={slug}></NoResultsComponent>
      )}
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
