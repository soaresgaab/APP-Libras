import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';
import {
  TypeLibrasData,
  TypeLibrasDataWithId,
} from '../../../@types/LibrasData';

export async function pushAddSignalById(
  dataWord?: TypeLibrasDataWithId,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      /*const data: AxiosResponse<any> = await axios.put(
        `https://libras.helpdesk-maraba.cloud/word_id/${dataWord?._id}/signal`,
        dataWord,
      );*/
      const data: AxiosResponse<any> = await axios.put(
        `http://10.0.2.2:4002/word_id/${dataWord?._id}/signal`,
        dataWord,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
