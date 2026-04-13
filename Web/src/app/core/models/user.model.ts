
// export class User {}
export interface UserModel  {
  id: number;
  fullName: string;
  email: string; 
  PasswordHash:string;
  Status:string;
  RefreshTokens:string;
  RefreshTokenExpiryTime:string;
  CreatedDate:string;
}
