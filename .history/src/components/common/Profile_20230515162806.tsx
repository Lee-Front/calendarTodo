import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/profile.svg";

const ProfileWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Profile = () => {
  return (
    <ProfileWrapper>
      <ProfileImg src={DefaultProfile} />
      <div>▽</div>
    </ProfileWrapper>
  );
};

export default Profile;
