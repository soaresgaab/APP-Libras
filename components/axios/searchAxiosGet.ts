import axios, { AxiosResponse } from 'axios';

export async function searchAxiosGet(
  rota?: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `https://run.mocky.io/v3/7e6cf2e9-26e4-4748-b958-908d6c799b63`,
      );
      setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
