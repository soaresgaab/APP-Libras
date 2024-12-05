import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { Link, router } from 'expo-router';
import { searchByRoute } from '@/utils/axios/searchByRote';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import CategoryViewerEdition from '@/components/edition_components/category_viewer_edition';
import Separator from '@/components/libras_componentes/separator';
import WordViewerEdition from '@/components/edition_components/word_viwer_edition';
import SuggestionViewerEdition from '@/components/edition_components/suggestion_viewer_edition';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;
const isWeb = width >= 1000 && height >= 617;

function App() {
  const [data, setDataFetch] = useState<any[]>();
  const [activeButton, setActiveButton] = useState('category');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function searchData() {
    setLoading(true);
    const response = await searchByRoute(activeButton);
    setLoading(false);
    setDataFetch(response.data);
  }

  function closeModalAndBack() {
    setModalVisible(false);
  }

  useEffect(() => {
    searchData();
  }, [activeButton]);

  function routePush(route: string) {
    setModalVisible(false);
    router.push({
      pathname: `${route}`,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Personalizar</Text>
      <Separator marginTopProp={10} marginBottomProp={5} />
      <View style={styles.divNavigator}>
        <View style={styles.divIconButton}>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: pressed ? '#6EB69D' : 'white',
                elevation: pressed ? 1 : 6,
              },
            ]}
          >
            <MaterialCommunityIcons
              style={{ alignSelf: 'center' }}
              name="playlist-plus"
              size={33}
              color="black"
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
          style={{ marginTop: isWeb ? 28 : 12 }}
        />
      )}
      {/* ---------------------------------------modal ---------------------------------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => closeModalAndBack()}>
          <BlurView
            tint={'systemChromeMaterialDark'}
            intensity={60}
            style={styles.modalOverlay}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButton,
                      pressed && styles.modalButtonOnPress,
                    ]}
                    onPress={() => routePush('edition/category/add')}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: 'center' }}
                      name="plus-box-multiple-outline"
                      size={23}
                      color="black"
                    />
                    <Text style={styles.modalText}>Adicionar Categorias</Text>
                  </Pressable>
                </View>
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButton,
                      pressed && styles.modalButtonOnPress,
                    ]}
                    onPress={() => routePush('edition/words/[word]')}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: 'center' }}
                      name="plus-box-multiple-outline"
                      size={23}
                      color="black"
                    />
                    <Text style={styles.modalText}>Adicionar Palavras</Text>
                  </Pressable>
                </View>
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButton,
                      pressed && styles.modalButtonOnPress,
                    ]}
                    onPress={() => closeModalAndBack()}
                  >
                    <Ionicons
                      style={{ alignSelf: 'center' }}
                      name="mail-outline"
                      size={23}
                      color="black"
                    />
                    <Text style={styles.modalText}>Sugerir Palavras</Text>
                  </Pressable>
                </View>
                <Separator
                  marginLeftProp={-40}
                  marginTopProp={7}
                  marginBottomProp={5}
                  widthProps={isWeb ? 280 : width * 0.7}
                />
                <View style={styles.modalIconsAndButtons}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalButtonClose,
                      pressed && styles.modalButtonCloseOnPress,
                    ]}
                    onPress={() => closeModalAndBack()}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={23}
                      color="black"
                    />
                    <Text style={styles.modalText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
    marginTop: isWeb ? 70 : 90,
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
    marginBottom: isWeb ? -15 : 0,
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
    paddingLeft: 2,
    paddingTop: 2,
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

  //--------------- modal style-------------------------
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0s)',
  },
  modalContainer: {
    width: 350,
    paddingVertical: 15,
    flexDirection: 'column',
    backgroundColor: '#ecf7f4',
    marginBottom: 4,
    paddingLeft: 35,
    borderRadius: 10,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: '#3d9577',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    fontSize: 18,
    paddingLeft: 6,
  },
  modalButton: {
    flexDirection: 'row',
    // backgroundColor: '#e7503b',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    width: isWeb ? 300 : '90%',
  },
  modalButtonOnPress: {
    flexDirection: 'row',
    backgroundColor: '#8e8e8e8a',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
    width: isWeb ? 300 : '90%',
  },
  modalButtonClose: {
    flexDirection: 'row',
    // backgroundColor: '#e7503b',
    paddingLeft: 1,
    marginBottom: -12,
    borderRadius: 5,
    width: isWeb ? 300 : '90%',
    paddingVertical: 5,
  },
  modalButtonCloseOnPress: {
    flexDirection: 'row',
    backgroundColor: '#8e8e8e8a',
    paddingLeft: 1,
    marginBottom: -12,
    borderRadius: 5,
    width: isWeb ? 280 : '90%',
  },
  modalIconsAndButtons: {
    flexDirection: 'row',
    paddingVertical: 1,
    // backgroundColor: 'red',
    marginBottom: 5,
  },
});

export default gestureHandlerRootHOC(App);
