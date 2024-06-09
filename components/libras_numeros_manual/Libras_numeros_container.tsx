import {
  Image,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { View } from '../Themed';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#F6F2DA',
    flexDirection: 'row',
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
    width: '95%',
    height: isTablet ? 207 : 140,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    paddingTop: 25,
    width: '48%',
    height: isTablet ? 250 : 180,
    marginBottom: 15,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e7503b',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export const Libras_numeros_container = ({}): React.ReactNode => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero0.png')}
            ></Image>
          }
          <Text style={styles.label}>0</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero1.png')}
            ></Image>
          }
          <Text style={styles.label}>1</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero2.png')}
            ></Image>
          }
          <Text style={styles.label}>2</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero3.png')}
            ></Image>
          }
          <Text style={styles.label}>3</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero4.png')}
            ></Image>
          }
          <Text style={styles.label}>4</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero5.png')}
            ></Image>
          }
          <Text style={styles.label}>5</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero6.png')}
            ></Image>
          }
          <Text style={styles.label}>6</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero7.png')}
            ></Image>
          }
          <Text style={styles.label}>7</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero8.png')}
            ></Image>
          }
          <Text style={styles.label}>8</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <Image
              style={styles.image}
              source={require('../../assets/mock_image/numeros/numero9.png')}
            ></Image>
          }
          <Text style={styles.label}>9</Text>
        </Pressable>
      </View>
      <View style={styles.container}></View>
    </>
  );
};
