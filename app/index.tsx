import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import GraficEcharts from '@/components/apacheEcharts/graficEcharts';
import { AxiosGet } from '@/components/axios/axiosGet';
import MonthYear from '@/components/formSearch/monthAndYear';
import { ScrollView } from 'react-native-gesture-handler';
import { TableData } from '@/components/viewsTables/tableData';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { center } from '@shopify/react-native-skia';
import { AlfabetoButton } from '@/components/libras-componentes/alfabeto-button';
import { CoresButton } from '@/components/libras-componentes/cores-button';
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
      {/* <MonthYear fetchData={fetchData} setRefreshing={setRefreshing} /> */}
      {/* <GraficEcharts option={option} /> */}
      <MonthYear></MonthYear>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          // backgroundColor: 'red',
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
          // backgroundColor: 'red',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          fontFamily: 'OMEGLE',
        }}
      >
        Uma visão regional: Marabá
      </Text>

      <AlfabetoButton></AlfabetoButton>
      <CoresButton></CoresButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    width: 'auto',
  },
});

export default gestureHandlerRootHOC(App);
