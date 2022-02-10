import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logout from "./Logout";

const MyPageContainer = styled.div`
  display: block;
`;

const ProfileWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;

  .profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfoContainer = styled.div`
  width: 300px;
  margin: 20px auto;
  font-size: 20px;

  ul {
    display: flex;
    padding: 0;
    margin: 10px 0;
    top: 10%;
  }

  li {
    display: block;
    width: 100px;
    height: 20px;
    list-style: none;
  }
`;

export default function MyPage() {
  const { loginSucceed } = useSelector(state => state.user);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginSucceed) {
      navigate("/login");
    }
  }, [loginSucceed]);

  return (
    <>
      {user ? (
        <MyPageContainer>
          <ProfileWrapper>
            <img className="profile" src={user.profile} alt="userProfile" />
          </ProfileWrapper>
          <UserInfoContainer>
            <ul>
              <li>이름</li>
              <li>{user.displayName}</li>
            </ul>
            <ul>
              <li>이메일</li>
              <li>{user.email}</li>
            </ul>
          </UserInfoContainer>
          <Logout />
        </MyPageContainer>
      ) : (
        <div>잠시만 기다려주세요.</div>
      )}
    </>
  );
}
