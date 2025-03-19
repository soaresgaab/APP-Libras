import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    id: 1,
    title: 'Bem-vindo ao glossário regional de LIBRAS',
    text: 'Encontre sinais para palavras, expressões regionais, e mais!',
    image: require('@/assets/onboarding_tutorial/icon.png'),
  },
  {
    id: 2,
    title: 'Explore menu',
    text: 'Navegue pelas funcionalidades do glossário.',
    image: require('@/assets/onboarding_tutorial/mmenu.png'),
  },
  {
    id: 3,
    title: 'Pesquise com Facilidade',
    text: 'Use a barra de pesquisa para encontrar rapidamente sinais específicos.',
    image: require('@/assets/onboarding_tutorial/seachinput.png'),
  },
  {
    id: 4,
    title: 'Navegue com facilidade pelos vocabulários',
    text: 'Navegue pelas diferentes categorias/vocabulários dos sinais.',
    image: require('@/assets/onboarding_tutorial/cards.png'),
  },
];

const Onboarding = ({ onDone }) => {
  return (
    <AppIntroSlider
      renderItem={({ item }) => (
        <View style={styles.slide}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
      data={slides}
      onDone={onDone}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edf8f4',
    margin: 'auto',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Onboarding;
