import React from 'react';
import { View, Text } from 'react-native';
import { TypeSlug } from '@/@types/slug';

export const NoResultsComponent = (userInput: TypeSlug) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        alignContent: 'center',
        marginTop: 30,
      }}
    >
      <Text style={{ fontSize: 18, textAlign: 'center' }}>
        {userInput !== undefined
          ? `Desculpe, sua pesquisa por ${userInput.slug} não encontrou nenhum resultado`
          : ''}
      </Text>
    </View>
  );
};
