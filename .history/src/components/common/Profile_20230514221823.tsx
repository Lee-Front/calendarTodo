import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/profile.svg";

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

const Profile = () => {
  return (
    <UserProfileWrapper>
      <UserProfile src={DefaultProfile} />
    </UserProfileWrapper>
  );
};

export default Profile;
