import { config } from '../../_helpers/config';
import { Property } from './types';

export const SubmitNewProperty = (property: Property): Promise<Response> => {
  const url = new URL('/house', config.ApiRoot);
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(property),
  };

  return fetch(url.toString(), options);
};

export const RetrieveAllProperties = (options: RequestInit): Promise<Response> => {
  const url = new URL('/house', config.ApiRoot);
  const opt: RequestInit = {
    ...options,
    method: 'GET',
  };

  return fetch(url.toString(), opt);
};

export const DeleteProperty = (id: string, options?: RequestInit): Promise<Response> => {
  const url = new URL(`/house/${id}`, config.ApiRoot);
  const opt: RequestInit = {
    ...options,
    method: 'DELETE',
  };

  return fetch(url.toString(), opt);
};

export const RetrieveProperty = (id: string, options?: RequestInit): Promise<Response> => {
  const url = new URL(`/house/${id}`, config.ApiRoot);
  const opt: RequestInit = {
    ...options,
    method: 'GET',
  };

  return fetch(url.toString(), opt);
};
