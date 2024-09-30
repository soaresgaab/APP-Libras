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
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { SVGSinaisImage } from '@/components/libras_componentes/image-component-home';
import Separator from '@/components/libras_componentes/separator';

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
      <Text style={styles.headerTitle}>GLOSSÁRIO DE LIBRAS</Text>
      <Text style={styles.subHeaderTitle}>Região sudeste do Pará</Text>

      <Separator />

      <View
        style={isTablet ? styles.buttonContainerTablet : styles.buttonContainer}
      >
        <CoresButton
          renderComponent={<SVGSinaisImage></SVGSinaisImage>}
          router={'(expregional)'}
          label={'Expressões Regionais'}
        />
        <CoresButton
          renderComponent={<SVGSinaisImage></SVGSinaisImage>}
          router={'(matematica)'}
          label={'Matemática'}
        />
        <CoresButton
          renderComponent={<SVGSinaisImage></SVGSinaisImage>}
          router={'(numeros)'}
          label={'Números'}
        />
        <CoresButton
          renderComponent={<SVGSinaisImage></SVGSinaisImage>}
          router={'(saudacoes)'}
          label={'Saudações'}
        />
        <CoresButton
          renderComponent={<SVGSinaisImage></SVGSinaisImage>}
          router={'(sinais)'}
          label={'Sinais'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf7f4',
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
    color: '#49688D',
  },
  subHeaderTitle: {
    marginTop: -5,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 2,
    width: '90%',
    fontWeight: '600',
    color: '#49688D',
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
