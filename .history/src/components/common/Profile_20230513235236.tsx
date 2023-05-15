import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/profile.svg";
import Dawn from "../../images/dawn.jpg";" 

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
  height: 5rem;
`;

const Profile = () => {
  const [url, setUrl] = useState<string>("/dawn.jpg");
  return (
    <UserProfileWrapper>
      <UserProfile src={url} />
    </UserProfileWrapper>
  );
};

export default Profile;
