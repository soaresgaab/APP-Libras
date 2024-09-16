import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
function App() {
  const [option, setData] = useState({});
  const [data, setDataFetch] = useState();
  const [refreshing, setRefreshing] = useState(true);

  return (
    <View>
      <Image
        source={require('../../assets/mock_image/sinais/amigo.png')}
      ></Image>
    </View>
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

// import { Image, View } from 'react-native';

// const ImageFull = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Image src={require('../../assets/mock_image/sinais/amigo.png')}></Image>
//     </View>
//   );
// };

// export default ImageFull;
