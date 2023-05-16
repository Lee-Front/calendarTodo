import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import axios, { AxiosError } from "axios";
import { LoginProps } from "../types/authTypes";

const LoginPage = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const nav = useNavigate();
  const [message, setMessage] = useState("");
  const login = useAuthStore((state) => state.login);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validate(formData)) {
        return;
      }
      const response = await axios.post("/login", formData);
      console.log("response: ", response);
      login();
      nav("/");
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validate = ({ userId, password }: LoginProps) => {
    if (!userId) {
      setMessage("아이디를 입력해주세요.");
      return false;
    }
    if (!password) {
      setMessage("비밀번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handlegoToSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nav("/signup");
  };
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleFormChange}
            placeholder="아이디"
          ></Input>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            placeholder="비밀번호"
          ></Input>
          <ErrorText>{message}</ErrorText>
        </InputWrapper>

        <Button>로그인</Button>
        <TextButtonsWrapper>
          <TextButton>아이디 찾기</TextButton>
          <TextButton>비밀번호 찾기</TextButton>
        </TextButtonsWrapper>
        <TestPlatformButtonWrapper>
          <TestPlatformLoginButton>구글</TestPlatformLoginButton>
          <TestPlatformLoginButton>카카오</TestPlatformLoginButton>
          <TestPlatformLoginButton>애플</TestPlatformLoginButton>
        </TestPlatformButtonWrapper>
        <Button onClick={handlegoToSignUp}>회원가입</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #ffda26;
`;

const LoginForm = styled.form`
  width: 29rem;
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  height: 3rem;
  text-indent: 0.7rem;
  font-size: 2rem;
  border-radius: 0.7rem;
  padding: 0.7rem;
  box-sizing: content-box;
  outline: none;
  appearance: none;
  text-decoration: none;

  ::placeholder {
    color: #8e8c8d;
  }
`;

const Button = styled.button`
  height: 4rem;
  font-size: 2.4rem;
  background-color: white;
  border-radius: 0.7rem;
  color: #8e8c8d;
  cursor: pointer;
`;

const TextButtonsWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const TextButton = styled.button`
  font-size: 1.6rem;
  line-height: 1.6rem;
  flex: 1;
  background: none;
  cursor: pointer;
  color: #8e8c8d;
  &:not(:last-child) {
    border-right: 1px solid #8e8c8d;
  }
`;

const TestPlatformButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  box-sizing: content-box;
  gap: 1.5rem;
`;
const TestPlatformLoginButton = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid #8e8c8d;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ErrorText = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  white-space: break-spaces;
`;
