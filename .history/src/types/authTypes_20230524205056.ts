export interface SiguUpProps extends LoginProps {
  confirmPassword: string;
}

export interface User {
  userId: string;
  password: string;
}

export interface LoginProps extends User {}
