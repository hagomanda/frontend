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

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 3px rgb(148, 178, 235) inset;
    }
  }
`;

export default function ShareButton() {
  const [showInvite, setShowInvite] = useState(false);

  const handleButtonClick = () => {
    setShowInvite(prev => !prev);
  };

  return (
    <ShareContainer>
      <div className="tooltip">
        <img onClick={handleButtonClick} src="/icons/share.svg" />
        <span className="tooltiptext">협업하기</span>
      </div>
      {showInvite && <InviteModal onClick={setShowInvite} />}
    </ShareContainer>
  );
}
