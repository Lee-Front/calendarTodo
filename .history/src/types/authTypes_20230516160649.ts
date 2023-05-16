export interface SiguUpProps extends LoginProps {
  passwordConfirm: string;
}

export interface LoginProps {
  userId: string;
  password: string;
}
