import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';

export async function pushDeleteWordById(
  dataWord?: Partial<TypeLibrasDataWithId>,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    console.log(dataWord);
    try {
      const data: AxiosResponse<any> = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/word/${dataWord?._id}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
