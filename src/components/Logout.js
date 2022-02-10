import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../features/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoutButton = styled.div`
  width: 80px;
  border-radius: 10%;
  text-align: center;

  &:hover {
    color: grey;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  width: 80px;
  margin-right: 1%;
  border-radius: 10%;
  text-align: center;
  text-decoration: none;
  color: black;

  &:hover {
    color: grey;
    cursor: pointer;
  }
`;

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogoutButtonClick = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <Container>
      <StyledLink to="/index">
        <div>서비스 소개</div>
      </StyledLink>
      <LogoutButton onClick={handleLogoutButtonClick}>로그아웃</LogoutButton>
    </Container>
  );
}
