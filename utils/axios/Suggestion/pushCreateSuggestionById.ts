import axios, { AxiosResponse } from 'axios';
import { TypeCategory } from '@/@types/Category';
import {
  TypeLibrasData,
  TypeLibrasDataWithId,
} from '../../../@types/LibrasData';

export async function pushCreateSuggestionById(
  dataWord?: TypeLibrasDataWithId,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/suggestion/`,
        dataWord,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
