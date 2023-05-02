import React, { useState } from "react";
import styled from "@emotion/styled";

const UserProfile = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #b2e9b2;
`;

const Profile = () => {
  const [url, setUrl] = useState<string | null>();
  return <UserProfile src={url} />;
};

export default Profile;
