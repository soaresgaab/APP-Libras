import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';

export async function searchById(
  rota: string,
  id?: string | string[],
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      /*const data: AxiosResponse<any> = await axios.get(
        `https://libras.helpdesk-maraba.cloud/${rota}/${id}`,
      );*/
      const data: AxiosResponse<any> = await axios.get(
        `http://10.0.2.2:4002/${rota}/${id}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
