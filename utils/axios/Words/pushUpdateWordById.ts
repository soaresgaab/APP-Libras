import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';
import {
  TypeLibrasData,
  TypeLibrasDataWithId,
} from '../../../@types/LibrasData';

export async function pushUpdateWordById(
  dataWord?: TypeLibrasDataWithId,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      /*const data: AxiosResponse<any> = await axios.put(
        `https://libras.helpdesk-maraba.cloud/word/${dataWord?._id}`,
        dataWord,
      );*/
      const data: AxiosResponse<any> = await axios.put(
        `http://10.0.2.2:4002/word/${dataWord?._id}`,
        dataWord,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
