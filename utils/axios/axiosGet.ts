import axios, { AxiosResponse } from 'axios';

export async function AxiosGet(
  rota: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `https://9de4-181-213-24-44.ngrok-free.app/api/v1/${rota}?nameTipo=${options?.query}&mes=${options?.mes}&ano=${options?.ano}`,
      );
      setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
