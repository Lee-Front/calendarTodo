import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/profile.svg";

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileWrapper>
        <ProfileImg src={DefaultProfile} />
      </ProfileWrapper>
      <DownArrow></DownArrow>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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

const DownArrow = styled.div`
  width: 100%;
  height: 100%;
  border-left: 0.7rem solid white;
  border-right: 0.7rem solid white;
  border-top: 1rem solid white;
`;
