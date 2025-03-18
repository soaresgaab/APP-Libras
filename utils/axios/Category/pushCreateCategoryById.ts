import axios, { AxiosResponse } from 'axios';
import { TypeCategory } from '@/@types/Category';

export async function pushCreateCategoryById(
  dataCategory?: Partial<TypeCategory>,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/category/`,
        dataCategory,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
