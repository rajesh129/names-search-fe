export type AuthResponse = {
  challengeToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    is_totp_enabled: boolean;
  };
};

export type AuthRequest = {
    email: string;
    password: string;
};

export type CodeAuthRequest = {
    challengeToken?: string;
    code?: string;
}

export type AuthUserState = AuthResponse & AuthRequest & CodeAuthRequest