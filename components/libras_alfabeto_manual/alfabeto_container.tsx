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
import ImageModal from '@/module/Image-modal/index';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
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
    width: isTablet ? 300 : 180,
    height: isTablet ? 310 : 180,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    width: isTablet ? 350 : 195,
    height: isTablet ? 380 : 240,
    paddingBottom: 60,
    paddingTop: 60,
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

export const AlfabetoContainer = ({}): React.ReactNode => {
  return (
    <>
      <View style={{ marginTop: 15 }}></View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/a.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>A</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/b.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>B</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/c.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>C</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/d.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>D</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/e.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>E</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/f.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>F</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/g.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>G</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/h.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>H</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/i.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>I</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/j.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>J</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/k.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>K</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/l.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>L</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/m.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>M</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/n.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>N</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/o.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>O</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/p.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>P</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/q.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>Q</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/r.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>R</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/s.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>S</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/t.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>T</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/u.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>U</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/v.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>V</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/w.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>W</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/x.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>X</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/y.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>Y</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {
            <ImageModal
              style={styles.image}
              source={require('../../assets/mock_image/alfabeto/z.jpg')}
            ></ImageModal>
          }
          <Text style={styles.label}>Z</Text>
        </Pressable>
      </View>
      <View style={styles.container}></View>
    </>
  );
};
