import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useToken = (dependency?: any) => {
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    const getToken = async () => {
      console.log('entrou 3');
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    getToken();
  }, [dependency]);

  return token;
};

export default useToken;
