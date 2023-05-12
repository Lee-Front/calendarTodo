import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ userId: "", password: "", confirmPassword: "" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", formData);
      console.log("response: ", response);
      if (response.status === 200) {
        nav("/login");
      }
    } catch (e) {
      console.log("err");
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
