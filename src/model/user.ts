export interface User {
  id: number;
  name: string;
}
export interface RegisterUser {
  email: string;
  userName: string;
}
export interface LoginUser {
  email: string;
  password: string;
  token?: string;
}
