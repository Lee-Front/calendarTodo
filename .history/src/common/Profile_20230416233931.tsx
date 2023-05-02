import React, { useState } from "react";
import styled from "@emotion/styled";
import { ReactComponent as DefaultProfile } from "../images/profile.svg";

const UserProfile = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #b2e9b2;
`;

const Profile = () => {
  const [url, setUrl] = useState<string>("");
  return (
    <UserProfile>
      {url ? <img src={DefaultProfile} /> : <DefaultProfile />}
    </UserProfile>
  );
};

export default Profile;
