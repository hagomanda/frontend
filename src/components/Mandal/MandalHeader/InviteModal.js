import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getUserInfo, shareMandal } from "../../../reducers/shareSlice";

const Container = styled.div`
  position: absolute;
  width: 300px;
  padding: 10px;
  background-color: #ebebeb;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  text-align: center;

  .inviteEmail {
    width: 100%;
    height: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    :focus {
      outline: none;
    }
  }

  button {
    width: 20%;
    height: 20%;
    margin-top: 10px;
    border: none;
    border-radius: 6px;
    background-color: #374661;
    font-size: 16px;
    color: #dce7f3;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  user-select: none;
  cursor: pointer;

  :hover {
    background-color: #c9c9c9;
    border-radius: 4px;
  }
`;

const ProfileWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  .profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function InviteModal({ onClick }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [email, setEmail] = useState("");

  const result = useSelector(state => state.share);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail(userInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [userInput]);

  useEffect(() => {
    if (email) {
      dispatch(getUserInfo(email));
    }
  }, [email]);

  const handleInviteButtonClick = async () => {
    dispatch(shareMandal({ id, email: result.user.email }));

    if (result.isShareSuccess) {
      onClick(false);
    }
  };

  return (
    <Container>
      <div>
        <input
          className="inviteEmail"
          type="text"
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
          placeholder="초대할 사람의 이메일 주소를 입력해주세요."
        />
      </div>
      <div>
        {!result.isSearchSuccess && <p>{result.message}</p>}
        {result.isSearchSuccess && (
          <ResultContainer
            id={result.user.email}
            onClick={handleInviteButtonClick}
          >
            <ProfileWrapper>
              <img
                className="profile"
                src={result.user.profile}
                alt="profile"
              />
            </ProfileWrapper>
            <div>
              <span>{result.user.email}</span>
            </div>
          </ResultContainer>
        )}
      </div>
      <button onClick={() => onClick(false)}>닫기</button>
    </Container>
  );
}

InviteModal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
