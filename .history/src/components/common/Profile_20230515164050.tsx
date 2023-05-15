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
      <DropDownMenu>
        <MenuItem>로그아웃</MenuItem>
      </DropDownMenu>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
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
  border-left: 0.7rem solid transparent;
  border-right: 0.7rem solid transparent;
  border-top: 1rem solid white;
`;

const DropDownMenu = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background: white;
`;

const MenuItem = styled.div``;
