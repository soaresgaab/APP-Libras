import axios, { AxiosResponse } from 'axios';

export async function AxiosGet(
  rota: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/${rota}?nameTipo=${options?.query}&mes=${options?.mes}&ano=${options?.ano}`,
      );
      setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
