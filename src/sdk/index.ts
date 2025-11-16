import { AxiosInstance } from "axios";
import { createHttpClient, ApiClientOptions } from "./http";
import { AuthApi } from "./auth";
import { UsersApi } from "./users";
import { UploadApi } from "./upload";
import { PlayersApi } from "./players";
import { NotificationsApi } from "./notifications";
import { ChallengesApi } from "./challenges";
import { ProfilesApi } from "./profiles";
import { DashboardApi } from "./dashboard";

export interface OpenLeagueApiClient {
  http: AxiosInstance;
  auth: AuthApi;
  users: UsersApi;
  upload: UploadApi;
  players: PlayersApi;
  notifications: NotificationsApi;
  challenges: ChallengesApi;
  profiles: ProfilesApi;
  dashboard: DashboardApi;
}

export function createOpenLeagueApiClient(
  options: ApiClientOptions
): OpenLeagueApiClient {
  const http = createHttpClient(options);
  return {
    http,
    auth: new AuthApi(http),
    users: new UsersApi(http),
    upload: new UploadApi(http),
    players: new PlayersApi(http),
    notifications: new NotificationsApi(http),
    challenges: new ChallengesApi(http),
    profiles: new ProfilesApi(http),
    dashboard: new DashboardApi(http),
  };
}

export * from "./types";
export * from "./http";
export * from "./players";
export * from "./notifications";
export * from "./challenges";
export * from "./profiles";
export * from "./dashboard";
