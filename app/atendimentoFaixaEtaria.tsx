import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import GraficEcharts from '@/components/apacheEcharts/graficEcharts';
import { AxiosGet } from '@/components/axios/axiosGet';
import { TableData } from '@/components/viewsTables/tableData';
import { View } from '@/components/Themed';
import MonthYear from '@/components/formSearch/monthAndYear';

function ModalScreen() {
  const [option, setData] = useState({});
  const [dataFetch, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = async (ano?: any, mes?: any) => {
    try {
      const response = await AxiosGet('atendimentoFaixaEtaria', {
        mes: mes || '',
        ano: ano || '',
      });
      setRefreshing(false);
      setDataFetch(response.data);
      response.data;

      const arrayString = response.data.map((item: any) => String(item.TipoDS));

      setData((prevState) => ({
        ...prevState,
        // title: {
        //   text: 'Atendimentos por Faixa Etária',
        //   left: 'center',
        //   top: '0%',
        // },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '1%',
          left: 'center',
          Data: arrayString,
        },
        grid: {
          top: '0%',
          left: '10%',
          right: '10%',
          bottom: '0%',
          containLabel: true,
        },
        series: [
          {
            label: {
              formatter: '{d|{d}%}',
              show: true,
              size: 40,
              lineHeight: 56,
              rich: {
                d: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33,
                  marginLeft: 0,
                },
              },
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10,
            },
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            type: 'pie',
            itemStyle: {
              borderRadius: 8,
            },
            data: response.data.map((item: any) => ({
              name:
                item.faixa_etaria !== null
                  ? item.faixa_etaria
                  : 'Não informado',
              value: item.Total_Ocorrencias,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            top: -100,
          },
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          progressViewOffset={70}
        />
      }
    >
      <MonthYear fetchData={fetchData} setRefreshing={setRefreshing} />
      <GraficEcharts option={option} height={500} />
      <TableData data={dataFetch}></TableData>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100C2A',
    width: 'auto',
  },
  button: {
    backgroundColor: '#100C2A',
    marginLeft: 2,
    alignSelf: 'flex-end',
  },
});
export default gestureHandlerRootHOC(ModalScreen);
