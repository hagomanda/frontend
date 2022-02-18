import React, { useState } from "react";
import styled from "styled-components";

import InviteModal from "./InviteModal";

const ShareContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;

  .tooltip {
    position: relative;
    display: block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgb(148, 178, 235);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
  }

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
        <span className="tooltiptext ">협업하기</span>
      </div>
      {showInvite && <InviteModal onClick={setShowInvite} />}
    </ShareContainer>
  );
}
