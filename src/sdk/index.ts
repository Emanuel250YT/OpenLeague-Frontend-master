import { AxiosInstance } from 'axios';
import { createHttpClient, ApiClientOptions } from './http.js';
import { AuthApi } from './auth.js';
import { UsersApi } from './users.js';
import { UploadApi } from './upload.js';

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

export * from './types.js';
export * from './http.js';


