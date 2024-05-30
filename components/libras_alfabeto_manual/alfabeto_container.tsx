import { Image, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { View } from '../Themed';

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
    height: 95,
    alignSelf: 'center',
    borderRadius: 10,
  },
  div: {
    paddingTop: 25,
    width: '35%',
    height: 130,
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
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/a.png')}
          ></Image> }
          <Text style={styles.label}>A</Text>
        </Pressable>
        <Pressable style={styles.div}>
          { <Image
            style={styles.image}
            source={require('../../assets/mock_image/b.png')}
          ></Image> }
          <Text style={styles.label}>B</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          { <Image
            style={styles.image}
            source={require('../../assets/mock_image/c.png')}
          ></Image> }
          <Text style={styles.label}>C</Text>
        </Pressable>
        <Pressable style={styles.div}>
          { <Image
            style={styles.image}
            source={require('../../assets/mock_image/d.png')}
          ></Image> }
          <Text style={styles.label}>D</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          { <Image
            style={styles.image}
            source={require('../../assets/mock_image/e.png')}
          ></Image> }
          <Text style={styles.label}>E</Text>
        </Pressable>
        <Pressable style={styles.div}>
          { <Image
            style={styles.image}
            source={require('../../assets/mock_image/f.png')}
          ></Image> }
          <Text style={styles.label}>F</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/g.png')}
          ></Image> }
          <Text style={styles.label}>G</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/h.png')}
          ></Image> }
          <Text style={styles.label}>H</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/i.png')}
          ></Image> }
          <Text style={styles.label}>I</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/j.png')}
          ></Image> }
          <Text style={styles.label}>J</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/k.png')}
          ></Image>}
          <Text style={styles.label}>K</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/l.png')}
          ></Image>}
          <Text style={styles.label}>L</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/m.png')}
          ></Image> }
          <Text style={styles.label}>M</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/n.png')}
          ></Image> }
          <Text style={styles.label}>N</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/o.png')}
          ></Image>}
          <Text style={styles.label}>O</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/p.png')}
          ></Image> }
          <Text style={styles.label}>P</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
        {<Image
            style={styles.image}
            source={require('../../assets/mock_image/q.png')}
          ></Image> }
          <Text style={styles.label}>Q</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/r.png')}
          ></Image> }
          <Text style={styles.label}>R</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/s.png')}
          ></Image> }
          <Text style={styles.label}>S</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/t.png')}
          ></Image> }
          <Text style={styles.label}>T</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/u.png')}
          ></Image> }
          <Text style={styles.label}>U</Text>
        </Pressable>
        <Pressable style={styles.div}>
        {<Image
            style={styles.image}
            source={require('../../assets/mock_image/v.png')}
          ></Image> }
          <Text style={styles.label}>V</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/w.png')}
          ></Image> }
          <Text style={styles.label}>W</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/x.png')}
          ></Image> }
          <Text style={styles.label}>X</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.div}>
         {<Image
            style={styles.image}
            source={require('../../assets/mock_image/y.png')}
          ></Image> }
          <Text style={styles.label}>Y</Text>
        </Pressable>
        <Pressable style={styles.div}>
          {<Image
            style={styles.image}
            source={require('../../assets/mock_image/z.png')}
          ></Image> }
          <Text style={styles.label}>Z</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
      </View>
    </>
  );
};
