import React from "react";
import styled from "@emotion/styled";

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <Input placeholder="아이디"></Input>
        <Input placeholder="비밀번호"></Input>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </LoginForm>
    </LoginContainer>
  );
};
const LoginContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  width: 30rem;
  height: 3rem;
  font-size: 2rem;
  padding: 4rem;
  outline: none;
  text-decoration: none;
`;
const Label = styled.label`
  font-size: 2rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  height: 4rem;
  flex: 1;
  font-size: 2rem;
`;
export default LoginPage;
