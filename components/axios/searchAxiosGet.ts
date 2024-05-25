import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';

export async function searchAxiosGetWords(
  Query?: string | string[],
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `http://192.168.100.133:4002/word/${Query}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
