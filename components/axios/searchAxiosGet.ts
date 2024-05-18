import axios, { AxiosResponse } from 'axios';

export async function searchAxiosGet(
  rota?: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `https://run.mocky.io/v3/e74e02a1-adb6-437b-921f-47412a2d236b`,
      );
      // setTimeout(() => {}, 5000);
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
