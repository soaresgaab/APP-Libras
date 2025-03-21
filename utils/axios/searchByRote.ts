import axios, { AxiosResponse } from 'axios';

export async function searchByRoute(
  route: string | string[],
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/${route}`,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
