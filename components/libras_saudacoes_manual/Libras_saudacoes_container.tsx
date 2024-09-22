import { Text, StyleSheet, Button, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { View } from '../Themed';
import ImageModal from '@/module/Image-modal/index';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
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
    width: isTablet ? 580 : 360,
    // height: 25,
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div: {
    paddingBottom: 40,
    paddingTop: 40,
    width: isTablet ? 700 : 370,
    height: isTablet ? 340 : 240,
    marginBottom: 15,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e7503b',
    alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export const Libras_saudacoes_container = ({}): React.ReactNode => {
  return (
    <>
      <View style={{ marginTop: 15 }}></View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          <ImageModal
            resizeMode="contain"
            style={styles.image}
            source={require('../../assets/mock_image/saudacoes/boa_noite.png')}
          />
          <Text style={styles.label}>Boa noite</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/boa_tarde.png')}
            />
          }
          <Text style={styles.label}>Boa tarde</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/bom_dia.png')}
            />
          }
          <Text style={styles.label}>Bom dia</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/obrigado.png')}
            />
          }
          <Text style={styles.label}>Obrigado</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/por_favor.png')}
            />
          }
          <Text style={styles.label}>Por favor</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/mock_image/saudacoes/tchau.png')}
            />
          }
          <Text style={styles.label}>Tchau</Text>
        </Pressable>
      </View>

      <View style={styles.container}></View>
    </>
  );
};
