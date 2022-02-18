import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const UserInfo = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 10px;
  flex-shrink: 0;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameWrapper = styled.div`
  text-align: center;

  span {
    font-size: 13px;
  }
`;

const MessageContainer = styled.div`
  width: auto;
  min-width: 150px;
  margin-right: 10px;
  padding: 10px;
`;

const MessageWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgba(148, 178, 235, 0.5);
  border-radius: 10px;

  p {
    margin: 5px;
    font-size: 14px;
  }
`;

const DateWrapper = styled.div`
  width: 100%;

  span {
    font-size: 13px;
    color: #848484;
  }
`;

export default function MessageBox({ data }) {
  const { profile, displayName, message, createdAt } = data;

  return (
    <Container>
      <UserInfo>
        <ProfileWrapper>
          <img src={profile} alt="profile" />
        </ProfileWrapper>
        <NameWrapper>
          <span>{displayName}</span>
        </NameWrapper>
      </UserInfo>
      <MessageContainer>
        <MessageWrapper>
          <p>{message}</p>
        </MessageWrapper>
        <DateWrapper>
          <span>{format(new Date(createdAt), "yyyy.MM.dd HH:mm")}</span>
        </DateWrapper>
      </MessageContainer>
    </Container>
  );
}

MessageBox.propTypes = {
  data: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
