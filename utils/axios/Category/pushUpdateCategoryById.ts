import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';

export async function pushUpdateCategoryById(
  dataCategory?: TypeCategory,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      /*const data: AxiosResponse<any> = await axios.put(
        `https://libras.helpdesk-maraba.cloud/category/${dataCategory?._id}`,
        dataCategory,
      );*/
      const data: AxiosResponse<any> = await axios.put(
        `http://10.0.2.2:4002/category/${dataCategory?._id}`,
        dataCategory,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
