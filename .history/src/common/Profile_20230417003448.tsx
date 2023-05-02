import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../images/profile.svg";

const UserProfileWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #b2e9b2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfile = styled.img`
  height: 5rem;
  padding: 0.5rem;
`;

const Profile = () => {
  const [url, setUrl] = useState<string>("");
  return (
    <UserProfileWrapper>
      <UserProfile src={url ? url : DefaultProfile} />
    </UserProfileWrapper>
  );
};

export default Profile;
