import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Text } from '@/components/Themed';
import SearchInput from '@/components/formSearch/searchInput';
import { useRouter } from 'expo-router'; // Import useRouter
import { Libras_regional_container } from '@/components/libras_expregionais_manual/Libras_expregionais_manual';
import { Libras_container } from '@/components/libras_geral_manual/Libras_geral_manual';
import { useLocalSearchParams } from 'expo-router';
import YoutubeIframe from 'react-native-youtube-iframe'

function App() {
  const { label } = useLocalSearchParams();
  const categoy = label || 'Default Label'; // Extract the label parameter from query
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
      <SearchInput />
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
        {categoy}
      </Text>
      <YoutubeIframe 
      videoId='ajsfNpZja5w'
      height={180}
      width={80}
      />
      <Libras_container label={categoy}/>
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