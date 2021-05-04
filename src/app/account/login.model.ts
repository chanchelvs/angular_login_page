export interface LoginInputModel {
  password: string;
  email: string;
}

export interface LoginOutputModel {
  success: boolean;
  message: string;
  data: userDataDTO;
}

export interface userDataDTO {
  userData: profileDTO;
  token: string;
}

export interface profileDTO {
  id?: 19;
  firstName?: null;
  lastName?: null;
  username?: string;
  email?: string;
  password?: string;
  phone?: number;
  is_deleted?: boolean;
  usertype_id?: number;
  token?: string;
  token_expiry?: Date;
  profilePic?: null;
  store_id?: number;
  updated?: number;
  created?: string;
  deleted?: string;
  created_by?: string;
  updated_by?: string;
}
