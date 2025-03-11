import axios, { AxiosResponse } from 'axios';
import { TypeCategory } from '@/@types/Category';
import {
  TypeLibrasData,
  TypeLibrasDataWithId,
  TypeLibrasDataWithOutId,
} from '../../../@types/LibrasData';

export async function pushCreateWordById(
  dataWord?: TypeLibrasDataWithId | TypeLibrasDataWithOutId,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    console.log(dataWord);
    try {
      const data: AxiosResponse<any> = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/word/`,
        dataWord,
      );
      console.log('response');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
