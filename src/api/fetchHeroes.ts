import {Hero, Response} from '../utils/types';
import {callApi} from './callApi';

export const fetchHeroes = async (): Promise<Response<Hero[]>> => {
  const response = await callApi({endpoint: 'people', method: 'GET'});

  return response;
};
