import React, { useState } from "react";
import styled from "@emotion/styled";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SiguUpProps } from "../types/authTypes";
import { Error } from "../types/commonTypes";

const SignUpPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ userId: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const validate = ({ userId, password, confirmPassword }: SiguUpProps) => {
    if (!userId) {
      setMessage("아이디를 입력해주세요.");
      return false;
    }
    if (!password) {
      setMessage("비밀번호를 입력해주세요.");
      return false;
    }
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validate(formData)) {
        return;
      }
      const response = await axios.post("/signup", formData);

      if (response.status === 200) {
        nav("/login");
      }
    } catch (e) {
      console.log("err");
      const error = e as AxiosError;
      console.log("error: ", error);
      // if (error.code === 409) {
      //   setMessage("이미 존재하는 아이디입니다.");
      // }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Input type="text" name="userId" autoComplete="off" placeholder="아이디" onChange={handleFormChange}></Input>
          <Input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="비밀번호"
            onChange={handleFormChange}
          ></Input>
          <Input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            placeholder="비밀번호 재확인"
            onChange={handleFormChange}
          ></Input>
          <ErrorText>{message}</ErrorText>
        </InputWrapper>
        <Button>가입하기</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default SignUpPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #ffda26;
`;

const LoginForm = styled.form`
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
  width: 25rem;
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

const ErrorText = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  white-space: break-spaces;
`;
