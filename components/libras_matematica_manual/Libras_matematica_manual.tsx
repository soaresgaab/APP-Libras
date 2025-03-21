import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { View } from '../Themed';
import ImageModal from '@/module/Image-modal/index';
import { useEffect, useState } from 'react';
import { searchByRoute } from '@/utils/axios/searchByRote';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

export const Libras_matematica_container = ({}): React.ReactNode => {
  const [fetchData, setFetchData] = useState<TypeLibrasDataWithId[]>();
  const [isLoading, setIsLoading] = useState(true);

  async function SearchData() {
    const data = await searchByRoute('word/category/Matemática').finally(() =>
      setIsLoading(false),
    );
    setFetchData(data.data);
  }

  useEffect(() => {
    SearchData();
    setIsLoading(true);
  }, []);

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
                    {
                      <ImageModal
                        style={styles.image}
                        source={{
                          uri: `data:image/jpeg;base64,${item2.src}`,
                        }}
                      ></ImageModal>
                    }
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
    // paddingTop: 25,
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
    paddingTop: 0,
    width: isTablet ? 700 : 370,
    height: isTablet ? 370 : 250,
    marginBottom: 15,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3d9577',
    marginTop: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
