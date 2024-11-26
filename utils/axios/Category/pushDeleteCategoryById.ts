import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';

export async function pushDeleteCategoryById(
  dataCategory?: Partial<TypeCategory>,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    dataCategory;
    try {
      const data: AxiosResponse<any> = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/category/${dataCategory?._id}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
