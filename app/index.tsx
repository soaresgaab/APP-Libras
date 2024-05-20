// import React, { useState } from 'react';
// import { View, Text, Image, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function App() {
//   const [base64Image, setBase64Image] = useState('');

//   const handleSelectImage = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert('Permissão para acessar a biblioteca de mídia é necessária.');
//       return;
//     }

//     const result: ImagePicker.ImagePickerResult =
//       await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [3, 4],
//         quality: 0.2,
//         base64: true,
//       });

//     if (!result.canceled && result.assets[0].base64) {
//       console.log(result.assets[0].base64);
//       setBase64Image(result.assets[0].base64);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Selecione uma imagem</Text>
//       <Button title="Selecionar Imagem" onPress={handleSelectImage} />

//       {base64Image ? (
//         <View>
//           <Text>Imagem Recebida</Text>
//           <Image
//             source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
//             style={{ width: 200, height: 200 }}
//           />
//         </View>
//       ) : null}
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import MonthYear from '@/components/formSearch/monthAndYear';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import { AlfabetoButton } from '@/components/libras_componentes/alfabeto-button';
import { CoresButton } from '@/components/libras_componentes/cores-button';
import { router } from 'expo-router';
function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} progressViewOffset={70} />
      }
    >
      <MonthYear></MonthYear>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        Dicionário da Língua Brasileira de Sinais
      </Text>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 20,
          width: '75%',
          // fontFamily: 'OMEGLE',
        }}
      >
        Uma visão regional: Marabá
      </Text>
      <AlfabetoButton />
      <CoresButton router={'Números'} label={'Números'} />
      <CoresButton router={'(search)/123'} label={'Calendários'} />
      <CoresButton router={'Redes de Comp.'} label={'Redes de Comp.'} />
      <CoresButton router={'Cores'} label={'Cores'} />
      <CoresButton router={'Cumprimentos'} label={'Cumprimentos'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F2DA',
    width: 'auto',
    paddingVertical: 0,
  },
});

export default gestureHandlerRootHOC(App);
