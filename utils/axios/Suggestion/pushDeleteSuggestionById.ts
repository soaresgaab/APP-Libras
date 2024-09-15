import axios, { AxiosResponse } from 'axios';
import { ProgressTransitionManager } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation';
import { TypeCategory } from '@/@types/Category';
import { TypeLibrasDataWithId } from '@/@types/LibrasData';

export async function pushDeleteSuggestionById(
  dataWord?: Partial<TypeLibrasDataWithId>,
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    console.log(dataWord);
    try {
      const data: AxiosResponse<any> = await axios.delete(
        `http://192.168.100.133:4002/suggestion/${dataWord?._id}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
