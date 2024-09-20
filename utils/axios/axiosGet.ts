import axios, { AxiosResponse } from 'axios';

export async function AxiosGet(
  rota: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      /*const data: AxiosResponse<any> = await axios.get(
        `https://libras.helpdesk-maraba.cloud/api/v1/${rota}?nameTipo=${options?.query}&mes=${options?.mes}&ano=${options?.ano}`,
      );*/
      const data: AxiosResponse<any> = await axios.get(
        `http://10.0.2.2:4002`,
      );
      setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
