import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import { Link, router } from 'expo-router';
import { View } from '../Themed';
import ImageModal from '@/module/Image-modal/index';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

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
    backgroundColor: '#e7d75d',
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
    borderColor: '#e7503b',
    marginTop: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export const Libras_sinais_container = ({}): React.ReactNode => {
  return (
    <>
      <View style={{ marginTop: 15 }}></View>
      <View style={styles.container}>
        <Pressable
          style={styles.div}
          onPress={() => router.navigate('(sinais)/imageMock')}
        >
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amigo.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Amigo</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amizade.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Amizade</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/amor.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Amor</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/casa.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Casa</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/importante.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Importante</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/sinais/jesus.png')}
            ></ImageModal>
          }
          <Text style={styles.label}>Jesus</Text>
        </Pressable>
      </View>

      <View style={styles.container}></View>
    </>
  );
};
