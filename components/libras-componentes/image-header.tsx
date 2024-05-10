import { Image, Text, StyleSheet } from 'react-native';

export const RenderHeader = (): React.ReactNode => {
  // Aqui você pode construir sua lógica para renderizar o header
  return (
    <Image
      style={styles.tinyLogo}
      source={require('../../assets/Imagem_do_WhatsApp_de_2024-05-10_à_s__11.12.35_90c7285d-removebg-preview.png')}
    ></Image>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
  },
  tinyLogo: {
    width: 130,
    height: 80,
    marginTop: -18,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
