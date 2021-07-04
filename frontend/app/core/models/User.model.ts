export interface UserModel {
  token?: string;
  refreshToken?: string;
  roles?: { name: string }[];
}
