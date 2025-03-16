import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { View } from '../Themed';
import ImageModal from '@/module/Image-modal/index';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';
import { searchByRoute } from '@/utils/axios/searchByRote';
import YoutubeIframe from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export const Libras_numeros_container = ({}): React.ReactNode => {
  const [fetchData, setFetchData] = useState<TypeLibrasDataWithId[]>();
  const [isLoading, setIsLoading] = useState(true);

  async function SearchData() {
    const data = await searchByRoute('word/category/números').finally(() =>
      setIsLoading(false),
    );
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
        <>
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
                        videoId={extractYoutubeVideoId(item2.src!)}
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
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
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
    marginBottom: 5,
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
