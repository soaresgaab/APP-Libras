import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  Dimensions,
  ActivityIndicator,
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
import CategoryViewerEdition from '@/components/edition_components/category_viewer_edition';
import Separator from '@/components/libras_componentes/separator';
import WordViewerEdition from '@/components/edition_components/word_viwer_edition';
import SuggestionViewerEdition from '@/components/edition_components/suggestion_viewer_edition';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [data, setDataFetch] = useState<any[]>();
  const [activeButton, setActiveButton] = useState('category');
  const [loading, setLoading] = useState<boolean>(false);

  async function searchData() {
    setLoading(true);
    const response = await searchByRoute(activeButton);
    setLoading(false);
    setDataFetch(response.data);
  }

  useEffect(() => {
    searchData();
  }, [activeButton]);

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
        <View style={styles.divIconButton}>
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              // { backgroundColor: pressed ? '#3d9577' : '#ffffff' },
              {
                elevation: pressed ? 1 : 6,
              },
            ]}
          >
            <AntDesign
              style={{ alignSelf: 'center' }}
              name="bars"
              size={35}
              color={'black'}
            />
          </Pressable>
        </View>

        {/* ---------------------------- buttons navigator ------------------------------------ */}
        <View style={styles.divButtomNavigator}>
          <Pressable
            onPress={() => {
              if (activeButton !== 'category') setDataFetch(undefined);
              setActiveButton('category');
            }}
            style={({ pressed }) => [
              styles.buttonsNavigator,
              activeButton === 'category' && styles.buttonsNavigatorActive,
              {
                elevation: pressed ? 1 : 6,
              },
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
            onPress={() => {
              if (activeButton !== 'word') setDataFetch(undefined);
              setActiveButton('word');
            }}
            style={({ pressed }) => [
              styles.buttonsNavigator,
              activeButton === 'word' && styles.buttonsNavigatorActive,
              {
                elevation: pressed ? 1 : 6,
              },
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
            onPress={() => {
              if (activeButton !== 'suggestion') setDataFetch(undefined);
              setActiveButton('suggestion');
            }}
            style={({ pressed }) => [
              styles.buttonsNavigator,
              activeButton === 'suggestion' && styles.buttonsNavigatorActive,
              {
                elevation: pressed ? 1 : 6,
              },
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
      {loading === false ? (
        <>
          {activeButton === 'category' && <CategoryViewerEdition data={data} />}
          {activeButton === 'word' && <WordViewerEdition data={data} />}
          {activeButton === 'suggestion' && (
            <SuggestionViewerEdition data={data} />
          )}
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color="#03459e"
          style={{ marginTop: 12 }}
        />
      )}
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
    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Sombra no Android
    elevation: 5,
  },
  iconButton: {
    alignItems: 'center',
    width: 38,
    height: 38,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#3d9577',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  divIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
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
