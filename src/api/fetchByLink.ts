import {BASE_URL} from '../utils/contants';
import {callApi} from './callApi';

export const fetchByLink = async (link: string) => {
  const endpoint = link.replace(BASE_URL, '');

  const response = await callApi({endpoint, method: 'GET'});

  return response;
};
