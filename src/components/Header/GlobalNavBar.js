import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logout from "../Logout";

const GnbContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #3c4963;
  color: #e5e5e5;

  img {
    height: 40%;
    margin: 0 15px;
  }

  a {
    color: #e5e5e5;
  }

  a:hover {
    color: #94b2eb;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  width: 200px;
`;

export default function GlobalNavBar() {
  const navigate = useNavigate();

  return (
    <GnbContainer>
      <LogoWrapper onClick={() => navigate("/")}>
        <img src="/img/logo.svg" />
        <span>HAGOMANDA</span>
      </LogoWrapper>
      <MenuWrapper>
        <Logout />
      </MenuWrapper>
    </GnbContainer>
  );
}
