import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  StatusBar,
  Dimensions,
  View,
  Pressable,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { CardButton } from '@/components/libras_componentes/card-button';
import { router } from 'expo-router';
import SearchInput from '@/components/formSearch/searchInput';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { SVGSinaisImage } from '@/components/libras_componentes/image-component-home';
import { SVGSinaisImageByCategory } from '@/components/libras_componentes/image-component-homeByCategory';
import Separator from '@/components/libras_componentes/separator';
import { TypeCategory } from '@/@types/Category';
import { CardsInMenu } from '@/components/libras_componentes/cores-button-dynamic';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState<TypeCategory[]>();
  const [refreshing, setRefreshing] = useState(true);

  async function searchData() {
    const response = await searchByRoute('category');
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
      <Separator marginTopProp={15} marginBottomProp={15} />
      <Text style={styles.headerTitle}>Categorias disponiveis</Text>
      {data ? (
        <View
          style={
            isTablet ? styles.buttonContainerTablet : styles.buttonContainer
          }
        >
          {data.map((item) => {
            return (
              <View key={item._id}>
                <CardsInMenu
                  routerCategory={item.nameCategory}
                  imageBase64={item.imgCategory}
                  label={item.nameCategory}
                ></CardsInMenu>
              </View>
            );
          })}
        </View>
      ) : null}

      <View
        style={isTablet ? styles.buttonContainerTablet : styles.buttonContainer}
      >
        {/* <CoresButton
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
        /> */}
        {/*data?.map((category, index) => (
          <Pressable key={index}>
            <CardButton label={category.nameCategory} img={category.imgCategory}/>
          </Pressable>
        ))*/}
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
  separator: {
    width: '90%',
    marginTop: 19,
    marginBottom: 22,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#cac9c99c',
  },
  headerTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    letterSpacing: 1,
    width: '90%',
    fontWeight: 'bold',
    color: '#49688D',
    marginBottom: 15,
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
