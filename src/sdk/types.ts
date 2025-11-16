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


