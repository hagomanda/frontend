import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import NavButton from "./NavButton";

const NavContainer = styled.div`
  display: ${props => props.display};
  justify-content: center;
  align-items: end;
  height: 80px;
  background-color: rgb(148, 178, 235);
`;

export default function Navbar() {
  const { pathname } = useLocation();
  const display = pathname === "/login" ? "none" : "flex";

  return (
    <NavContainer display={display}>
      <NavButton textName={"Home"} link="/home" />
      <NavButton textName={"Calendar"} link="/calendar" />
      <NavButton textName={"MyPage"} link="/mypage" />
    </NavContainer>
  );
}
