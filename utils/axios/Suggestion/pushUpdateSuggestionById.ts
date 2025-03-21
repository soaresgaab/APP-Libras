import axios, { AxiosResponse } from 'axios';
import { TypeCategory } from '@/@types/Category';
import {
  TypeLibrasData,
  TypeLibrasDataSuggestion,
  TypeLibrasDataWithId,
} from '../../../@types/LibrasData';

export async function pushUpdateSuggestionById(
  dataWord?: TypeLibrasDataSuggestion,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/suggestion/${dataWord?._id}`,
        dataWord,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
