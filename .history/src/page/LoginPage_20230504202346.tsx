import React from "react";
import styled from "@emotion/styled";

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <Input></Input>
        <Input></Input>
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
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  width: 20rem;
  height: 5rem;
`;
export default LoginPage;
