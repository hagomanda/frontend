import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { logoutRequest } from "../reducers/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 0 auto;
`;

const LogoutButton = styled.div`
  width: 80px;
  border-radius: 10%;
  text-align: center;

  &:hover {
    color: #94b2eb;
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
    color: #94b2eb;
    cursor: pointer;
  }
`;

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginSucceed } = useSelector(state => state.user);

  const handleLogoutButtonClick = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  return (
    <Container>
      <StyledLink to="/">
        <div>서비스 소개</div>
      </StyledLink>
      {loginSucceed ? (
        <LogoutButton onClick={handleLogoutButtonClick}>로그아웃</LogoutButton>
      ) : (
        <LogoutButton onClick={() => navigate("/login")}>로그인</LogoutButton>
      )}
    </Container>
  );
}
