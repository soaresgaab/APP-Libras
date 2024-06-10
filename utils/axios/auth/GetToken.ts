import axios, { AxiosResponse } from 'axios';

import { TypeUser } from '@/@types/User';

export async function GetToken(DataAuth?: TypeUser): Promise<AxiosResponse> {
  return new Promise(async (resolve, reject) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVkMGJlNjNlMjc4MDc0OWE5NDFiODEiLCJ1c2VyTmFtZSI6ImVyaWNrLmdhaWEiLCJyb2xlIjoiNjY1ZDA4MmVkNmY1MjU0ZTRkMGU5OTNmIiwiaWF0IjoxNzE3Mzc3NjQyfQ.lASJkhW5PrbuY3DHjlTK0CNpKLexvsfxLiUVQsR4QCY';
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data: AxiosResponse<any> = await axios.post(
        `https://libras.helpdesk-maraba.cloud/login`,
        DataAuth,
        config,
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// https://run.mocky.io/v3/a44a54fa-8fc5-4796-9086-16493c5259df
