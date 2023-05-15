import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/profile.svg";
import { ProfileProps } from "../../types/commonTypes";

const UserProfileWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const UserProfile = styled.img`
  width: 100%;
  height: 100%;
`;

const Profile = ({ profileImg }: ProfileProps) => {
  const [url, setUrl] = useState<string>(profileImg);
  return (
    <UserProfileWrapper>
      <UserProfile src={url ? url : DefaultProfile} />
    </UserProfileWrapper>
  );
};

export default Profile;
