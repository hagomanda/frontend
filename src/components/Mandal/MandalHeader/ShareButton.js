import React, { useState } from "react";
import styled from "styled-components";

import InviteModal from "./InviteModal";

const ShareContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function ShareButton() {
  const [showInvite, setShowInvite] = useState(false);

  const handleButtonClick = () => {
    setShowInvite(prev => !prev);
  };

  return (
    <ShareContainer>
      <img onClick={handleButtonClick} src="/icons/share.svg" />
      {showInvite && <InviteModal onClick={setShowInvite} />}
    </ShareContainer>
  );
}
