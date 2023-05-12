import React from "react";
import styled from "@emotion/styled";

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <InputWrapper>
          <Input placeholder="아이디"></Input>
          <Input placeholder="비밀번호"></Input>
        </InputWrapper>
        <Button>로그인</Button>
        <TextButtonsWrapper>
          <TextButton>아이디 찾기</TextButton>
          <TextButton>비밀번호 찾기</TextButton>
        </TextButtonsWrapper>
        <Button>회원가입</Button>
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
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 25rem;
  height: 3rem;
  font-size: 2rem;
  border-radius: 0.7rem;
  padding: 0.7rem;
  box-sizing: content-box;
  outline: none;
  text-decoration: none;
  ::placeholder {
    text-indent: 0.7rem;
    color: #8e8c8d;
  }
`;

const Button = styled.button`
  height: 4rem;
  flex: 1;
  font-size: 2.5rem;
  background-color: white;
  border-radius: 0.7rem;
`;

const TextButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const TextButton = styled.button`
  font-size: 1.6rem;
  flex: 1;
  background: none;
  cursor: pointer;
  color: #8e8c8d;
`;
