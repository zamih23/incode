import {BASE_URL} from '../utils/contants';

interface CallApiArgs {
  endpoint: string;
  method: 'POST' | 'GET';
  body?: any;
}

export const callApi = async ({endpoint, method, body}: CallApiArgs) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
