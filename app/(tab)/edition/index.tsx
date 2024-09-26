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
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CategoryViewerEdition from '@/components/edition_components/category_viewer_edition';
import Separator from '@/components/libras_componentes/separator';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState<TypeCategory[]>();
  const [activeButton, setActiveButton] = useState('category');

  async function searchData() {
    const response = await searchByRoute('category');
    console.log(response.data);
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
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Personalizar</Text>
      <Separator marginTopProp={10} marginBottomProp={5} />
      <View style={styles.divNavigator}>
        <Pressable style={styles.iconButton}>
          <AntDesign
            style={{ alignSelf: 'flex-end' }}
            name="bars"
            size={35}
            color={'black'}
          />
        </Pressable>
        {/* ---------------------------- buttons navigator ------------------------------------ */}
        <View style={styles.divButtomNavigator}>
          <Pressable
            onPress={() => setActiveButton('category')}
            style={[
              styles.buttonsNavigator,
              activeButton === 'category' && styles.buttonsNavigatorActive,
            ]}
          >
            <Text
              style={[
                styles.textButtomDivNavigator,
                activeButton !== 'category' &&
                  styles.textButtomDivNavigatorActive,
              ]}
            >
              Categorias
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveButton('word')}
            style={[
              styles.buttonsNavigator,
              activeButton === 'word' && styles.buttonsNavigatorActive,
            ]}
          >
            <Text
              style={[
                styles.textButtomDivNavigator,
                activeButton !== 'word' && styles.textButtomDivNavigatorActive,
              ]}
            >
              Palavras
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveButton('suggestion')}
            style={[
              styles.buttonsNavigator,
              activeButton === 'suggestion' && styles.buttonsNavigatorActive,
            ]}
          >
            <Text
              style={[
                styles.textButtomDivNavigator,
                activeButton !== 'suggestion' &&
                  styles.textButtomDivNavigatorActive,
              ]}
            >
              Sugestões
            </Text>
          </Pressable>
        </View>
        {/* ---------------------------- buttons navigator ------------------------------------ */}
      </View>
      <CategoryViewerEdition data={data}></CategoryViewerEdition>
    </View>
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
    marginTop: 90,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 26,
    width: '90%',
    fontWeight: 'bold',
    color: '#03459e',
  },
  divButtomNavigator: {
    height: 50,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  divNavigator: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
  },
  buttonsNavigator: {
    backgroundColor: '#ffffff',
    borderColor: '#3d9577',
    borderWidth: 1,
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  iconButton: {
    alignItems: 'center',
    width: 45,
  },
  buttonsNavigatorActive: {
    backgroundColor: '#beffe7', // Cor do botão ativo
  },
  textButtomDivNavigator: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    color: '#03459e',
  },
  textButtomDivNavigatorActive: {
    color: '#6f99d0',
  },
});

export default gestureHandlerRootHOC(App);
