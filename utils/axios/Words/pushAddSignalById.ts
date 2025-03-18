import axios, { AxiosResponse } from 'axios';
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
      const data: AxiosResponse<any> = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/word_id/${dataWord?._id}/signal`,
        dataWord,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
