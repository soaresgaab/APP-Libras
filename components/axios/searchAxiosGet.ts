import axios, { AxiosResponse } from 'axios';

export async function searchAxiosGet(
  rota?: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `https://run.mocky.io/v3/5b4b9923-41bc-4b3d-9e02-5bd446055ca6`,
      );
      console.log(data.data);
      setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
