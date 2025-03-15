import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Pressable,
  TextInput,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import SearchInput from '@/components/formSearch/searchInput';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { searchAxiosGetWords } from '@/utils/axios/searchAxiosGet';
import {
  TypeLibrasData,
  TypeLibrasDataSinais,
  TypeLibrasDataWithId,
} from '@/@types/LibrasData';
import { NoResultsComponent } from '@/components/formSearch/erroSearch';
import { Image } from 'expo-image';
import { DataLibrasReducer } from '@/utils/reducer/DataLibrasReducer';
import { initialStateDataLibrasReducer } from '../../../../utils/reducer/DataLibrasReducer';
import * as ImagePicker from 'expo-image-picker';
import { Foundation } from '@expo/vector-icons';
import ImageModal, { ImageDetail } from '@/module/Image-modal';
import { searchByRoute } from '@/utils/axios/searchByRote';
import YoutubeIframe from '@/module/iframe-yt';
import Separator from '@/components/libras_componentes/separator';
const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

function App() {
  const [fetchData, setFetchData] = useState<TypeLibrasDataWithId[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useLocalSearchParams();

  async function SearchData() {
    const data = await searchByRoute(`word/category/${slug}`).finally(() =>
      setIsLoading(false),
    );
    console.log(data.data);
    setFetchData(data.data);
  }

  useEffect(() => {
    SearchData();
  }, []);

  const extractYoutubeVideoId = (url: any) => {
    let videoId = null;
    // Verifica se a URL é do formato longo (youtube.com)
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    // Verifica se a URL é do formato curto (youtu.be)
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId;
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '',
            marginTop: 20,
          }}
        >
          <ActivityIndicator size="large" color="#123456" />
        </View>
      ) : (
        <View style={{ backgroundColor: '#edf8f4' }}>
          <View style={{ marginTop: 40 }}></View>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 26,
              width: '75%',
              fontWeight: 'bold',
              color: '#03459e',
            }}
          >
            {slug}
          </Text>
          <Separator marginTopProp={15} marginBottomProp={10}></Separator>
          {fetchData?.map((item, index) => (
            <View key={index} style={{ backgroundColor: '#edf8f4' }}>
              {item.wordDefinitions?.map((item2, index2) => (
                <View key={index2} style={styles.container}>
                  <Pressable style={styles.div}>
                    {item2.fileType === 'image' && (
                      <ImageModal
                        style={styles.image}
                        source={{
                          uri: `data:image/jpeg;base64,${item2.src}`,
                        }}
                      ></ImageModal>
                    )}
                    {item2.fileType === 'video' && (
                      <YoutubeIframe
                        videoId={extractYoutubeVideoId(item2.src)}
                        height={isTablet ? 295 : 180}
                        width={isTablet ? 660 : 340}
                      />
                    )}
                    <Text style={styles.label}>{item.nameWord}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#edf8f4',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    paddingVertical: 6,
    marginTop: 10,
    alignSelf: 'center',
    // borderWidth: 2,
    // borderColor: '#e7503b',
    backgroundColor: '#3d9577',
    borderRadius: 20,
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: isTablet ? 660 : 340,
    height: isTablet ? 295 : 180,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    width: isTablet ? 700 : 370,
    height: isTablet ? 370 : 250,
    paddingBottom: 60,
    paddingTop: 60,
    marginBottom: 0,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3d9577',
    alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default gestureHandlerRootHOC(App);
