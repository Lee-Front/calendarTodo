import React from "react";
import styled from "@emotion/styled";

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <Label>
          ID
          <Input></Input>
        </Label>
        <Label>
          PW
          <Input></Input>
        </Label>
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
`;
const Label = styled.label`
  font-size: 2rem;
`;
export default LoginPage;
