import React from "react";
import styled from "@emotion/styled";
import axios from "axios";

const SignUpPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/signup", { id: "", password: "" });
  };
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Input type="text" autoComplete="new-username" placeholder="아이디"></Input>
          <Input type="password" autoComplete="new-password" placeholder="비밀번호"></Input>
          <Input type="password" autoComplete="new-password" placeholder="비밀번호 재확인"></Input>
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
