import { AxiosInstance } from 'axios';
import { CreateUserRequest, UserSummary } from './types.js';

export class UsersApi {
  constructor(private http: AxiosInstance) {}

  async create(payload: CreateUserRequest): Promise<UserSummary> {
    const { data } = await this.http.post<UserSummary>('/users', payload);
    return data;
  }

  async list(): Promise<UserSummary[]> {
    const { data } = await this.http.get<UserSummary[]>('/users');
    return data;
  }

  async getById(id: string): Promise<UserSummary> {
    const { data } = await this.http.get<UserSummary>(`/users/${id}`);
    return data;
  }
}


