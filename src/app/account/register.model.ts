export interface RegisterModel {
  email: string;
  password: string;
  username: string;
  phone: number;
}

export interface RegisterOutputModel {
  success: boolean;
  message: string;
  data: null;
}
