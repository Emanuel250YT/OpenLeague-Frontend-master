import { AxiosInstance } from 'axios';
import {
  Challenge,
  CreateChallengeRequest,
  CreateSubmissionRequest,
  ChallengeStatus,
} from './types';

export class ChallengesApi {
  constructor(private http: AxiosInstance) {}

  async create(payload: CreateChallengeRequest): Promise<Challenge> {
    const { data } = await this.http.post<Challenge>('/challenges', payload);
    return data;
  }

  async list(params?: {
    status?: ChallengeStatus | ChallengeStatus[];
    page?: number;
    limit?: number;
    creatorId?: string;
    opponentId?: string;
  }): Promise<Challenge[]> {
    const { data } = await this.http.get<Challenge[]>('/challenges', { params });
    return data;
  }

  async getById(id: string): Promise<Challenge> {
    const { data } = await this.http.get<Challenge>(`/challenges/${id}`);
    return data;
  }

  async accept(id: string): Promise<Challenge> {
    const { data } = await this.http.post<Challenge>(`/challenges/${id}/accept`, {});
    return data;
  }

  async reject(id: string, reason?: string): Promise<Challenge> {
    const { data } = await this.http.post<Challenge>(`/challenges/${id}/reject`, { reason });
    return data;
  }

  async cancel(id: string, reason?: string): Promise<Challenge> {
    const { data } = await this.http.post<Challenge>(`/challenges/${id}/cancel`, { reason });
    return data;
  }

  async submitResult(id: string, payload: CreateSubmissionRequest): Promise<Challenge> {
    const { data } = await this.http.post<Challenge>(`/challenges/submissions`, payload);
    return data;
  }

  async update(id: string, payload: Partial<CreateChallengeRequest>): Promise<Challenge> {
    const { data } = await this.http.patch<Challenge>(`/challenges/${id}`, payload);
    return data;
  }
}

export type {
  Challenge,
  CreateChallengeRequest,
  CreateSubmissionRequest,
  ChallengeStatus,
} from './types';


