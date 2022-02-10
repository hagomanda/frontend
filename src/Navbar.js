import React from "react";
import styled from "styled-components";

import NavButton from "./NavButton";

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavButton textName={"Home"} link="/main" />
      <NavButton textName={"Calendar"} link="/calendar" />
      <NavButton textName={"MyPage"} link="/mypage" />
    </NavContainer>
  );
}
