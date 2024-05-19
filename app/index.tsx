import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [base64Image, setBase64Image] = useState('');

  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.2,
        base64: true,
      });

    if (!result.canceled && result.assets[0].base64) {
      console.log(result.assets[0].base64);
      setBase64Image(result.assets[0].base64);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Selecione uma imagem</Text>
      <Button title="Selecionar Imagem" onPress={handleSelectImage} />

      {base64Image ? (
        <View>
          <Text>Imagem Recebida</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      ) : null}
    </View>
  );
}
