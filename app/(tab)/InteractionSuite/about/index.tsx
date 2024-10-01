import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  StatusBar,
  Dimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

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
      <View style={{ marginTop: isTablet ? 134 : 92 }}></View>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Text style={styles.headerTitle}>Sobre</Text>
      <View style={styles.separator}></View>
      <Text style={styles.subHeaderTitle}>
        O aplicativo Glossário Bilíngue “Libras Sudeste Pará” foi produzido pela
        Universidade Federal do Sul e Sudeste do Pará (Unifesspa) e a pela
        Câmara Municipal de Marabá por meio da Escola do Legislativo (Elmar),
        tendo como parceiro o Centro de Atendimento Especializado na Área da
        Surdez (CAES). O intuito do aplicativo é atender às necessidades da
        comunidade surda local, utilizando para isso uma plataforma acessível e
        prática para o aprendizado e o uso das Libras. Possui enfoque específico
        na região Sudeste do Pará, incorporando sinais e expressões que refletem
        as particularidades e o cotidiano da região. Isso não só ajuda a tornar
        alinguagem mais relevante e útil para os usuários, mas também promove
        uma conexão mais profunda com a cultura local. Durante o ano de 2023,
        foi realizado o registro dos sinais dos bairros de Marabá e dos
        vereadores da 19º Legislatura (2021 - 2024), com o objetivo de colaborar
        para a construção de acessibilidade no âmbito legislativo e assim
        cumprir a legislação que define direitos para as pessoas surdas. O
        referido glossário será atualizado, conforme necessidade.
      </Text>

      <View style={styles.separator}></View>

      <View
        style={isTablet ? styles.buttonContainerTablet : styles.buttonContainer}
      ></View>
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
  headerTitle: {
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    letterSpacing: 2,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  subHeaderTitle: {
    marginTop: -5,
    alignSelf: 'center',
    textAlign: 'justify',
    fontSize: 19,
    letterSpacing: 2,
    width: '90%',
    fontWeight: '600',
    color: '#03459e',
    borderWidth: 2,
    borderColor: '#3d9577',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  separator: {
    width: '90%',
    marginTop: 19,
    marginBottom: 22,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#cac9c99c',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
  },
  buttonContainerTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
});

export default gestureHandlerRootHOC(App);
