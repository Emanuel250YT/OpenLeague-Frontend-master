export interface ApiResponseSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface UserSummary {
  id: string;
  email: string;
  name?: string | null;
  wallets?: Array<{
    address: string;
    network?: string | null;
    currency?: string | null;
    isDefault?: boolean | null;
  }>;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserSummary;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
  // También podría soportar login por wallet según el backend
  walletAddress?: string;
  signature?: string;
}

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserRequest {
  name?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UploadFileOptions {
  description?: string;
  compress?: boolean;
  enableDashStreaming?: boolean;
  ttl?: number;
}

export interface UploadedFileInfo {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
  publicUrl: string;
  // Campos adicionales que el backend retorna en uploadService.uploadFile
  [k: string]: unknown;
}

export interface BaseProfile {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  [k: string]: unknown;
}

export interface PlayerProfile extends BaseProfile {
  role: 'player';
}

export interface ClubProfile extends BaseProfile {
  role: 'club';
  name?: string;
  symbol?: string;
  tokenAddress?: string | null;
  tokenSupply?: string | null;
}

export interface CoachProfile extends BaseProfile {
  role: 'coach';
}

export interface FanProfile extends BaseProfile {
  role: 'fan';
  loyaltyPoints?: number;
}

export type AnyProfile = PlayerProfile | ClubProfile | CoachProfile | FanProfile;

export type CreatePlayerProfileRequest = Record<string, unknown>;
export type UpdatePlayerProfileRequest = Record<string, unknown>;

export type CreateClubProfileRequest = Record<string, unknown>;
export interface UpdateClubTokenRequest {
  tokenAddress: string;
  tokenSupply: string;
}

export type CreateCoachProfileRequest = Record<string, unknown>;
export type CreateFanProfileRequest = Record<string, unknown>;

export interface UpdatePlayerNftRequest {
  nftTokenId: string;
  contractAddress: string;
}

// =======================
// Challenge Submissions (para dashboard)
// =======================
export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  arkaFileId: string;
}

export interface SubmissionVotes {
  up: number;
  down: number;
  score: number;
}

export interface ChallengeSubmissionWithVotes extends ChallengeSubmission {
  votes: SubmissionVotes & { total: number };
}

export interface UserDashboardStats {
  completedChallenges: number;
  currentStreakDays: number;
  videosUploaded: number;
  globalRank?: number | null;
}

export type NotificationType =
  | 'SYSTEM'
  | 'CHALLENGE_INVITE'
  | 'CHALLENGE_STATUS'
  | 'MESSAGE'
  | 'OTHER';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body?: string | null;
  read: boolean;
  createdAt: string;
  // payload libre según el evento
  meta?: Record<string, unknown>;
}

export type ChallengeStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED';

export interface Challenge {
  id: string;
  title: string;
  description?: string | null;
  status: ChallengeStatus;
  creatorId: string;
  opponentId?: string | null;
  scheduledAt?: string | null;
  createdAt: string;
  updatedAt: string;
  // Datos adicionales del dominio
  meta?: Record<string, unknown>;
  result?: {
    winnerId?: string | null;
    score?: Record<string, unknown>;
    submittedAt?: string;
  } | null;
}

export interface CreateChallengeRequest {
  title: string;
  description?: string;
  opponentId?: string;
  scheduledAt?: string; // ISO
  meta?: Record<string, unknown>;
}

export interface SubmitChallengeResultRequest {
  winnerId?: string;
  score?: Record<string, unknown>;
  notes?: string;
}

// Payload para crear una submission de challenge
export interface CreateSubmissionRequest {
  challengeId: string;
  description?: string;
  arkaFileId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  metadata?: Record<string, unknown>;
}


