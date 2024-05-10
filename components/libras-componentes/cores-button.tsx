import { Image, Text, StyleSheet, Button, Pressable } from 'react-native';

export const CoresButton = (): React.ReactNode => {
  return (
    <>
      <Pressable style={styles.div}>
        <Image
          style={styles.image}
          source={require('../../assets/ImagemButtonCores.jpg')}
        ></Image>
        <Text style={styles.label}>Cores</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
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
    width: '70%',
    height: 90,
    alignSelf: 'center',
  },
  div: {
    width: '70%',
    height: 185,
    marginTop: 50,
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
