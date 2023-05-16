export interface SiguUpProps extends LoginProps {
  confirmPassword: string;
}

export interface LoginProps {
  userId: string;
  password: string;
}
