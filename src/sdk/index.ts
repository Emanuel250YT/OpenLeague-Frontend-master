import { AxiosInstance } from 'axios';
import { createHttpClient, ApiClientOptions } from './http';
import { AuthApi } from './auth';
import { UsersApi } from './users';
import { UploadApi } from './upload';

export interface OpenLeagueApiClient {
  http: AxiosInstance;
  auth: AuthApi;
  users: UsersApi;
  upload: UploadApi;
}

export function createOpenLeagueApiClient(options: ApiClientOptions): OpenLeagueApiClient {
  const http = createHttpClient(options);
  return {
    http,
    auth: new AuthApi(http),
    users: new UsersApi(http),
    upload: new UploadApi(http),
  };
}

export * from './types';
export * from './http';


