import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfo, shareMandal } from "../../../reducers/shareSlice";

const Container = styled.div`
  position: absolute;
  width: 300px;
  background-color: #ebebeb;
  padding: 10px;
  border: 1px solid #e6e6e6;
  text-align: center;

  .inviteEmail {
    width: 90%;
    height: 20px;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: #c9c9c9;
  }
`;

const ProfileWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

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
