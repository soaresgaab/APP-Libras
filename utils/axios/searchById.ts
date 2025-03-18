import axios, { AxiosResponse } from 'axios';

export async function searchById(
  rota: string,
  id?: string | string[],
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/${rota}/${id}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
