import styled from "styled-components";
import NavButton from "./NavButton";

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavButton
        textName={"Home"}
      />
      <NavButton
        textName={"Calendar"}
      />
      <NavButton
        textName={"MyPage"}
      />
    </NavContainer>
  );
}
