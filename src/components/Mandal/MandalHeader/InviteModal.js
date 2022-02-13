import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";

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

const getUserInfo = async (email, setState) => {
  try {
    const { data } = await axios.get("/api/users", {
      headers: {
        otheruser: email,
      },
    });

    if (!data.message) {
      setState({ isSuccess: true, user: data.user });
    } else {
      setState({ isSuccess: false, message: "검색 결과가 없습니다." });
    }
  } catch (error) {
    setState({ isSuccess: false, message: "오류가 발생했습니다." });
  }
};

const shareMandal = async (goalId, email) => {
  try {
    const res = await axios.post(`/api/goals/mainGoal/${goalId}/users`, {
      email: email,
    });

    if (res.data.result === "ok") {
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  } catch (error) {
    return { isSuccess: false };
  }
};

export default function InviteModal({ onClick }) {
  const { id } = useParams();
  const [userInput, setUserInput] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({
    isSuccess: false,
    message: "검색 결과가 여기에 나타납니다.",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail(userInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [userInput]);

  useEffect(() => {
    if (email) {
      getUserInfo(email, setResult);
    }
  }, [email]);

  const handleInviteButtonClick = async () => {
    const { isSuccess } = await shareMandal(id, result.user.email);
    if (isSuccess) {
      onClick(false);
    } else {
      setResult({ isSuccess: false, message: "오류가 발생했습니다." });
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
        {!result.isSuccess && <p>{result.message}</p>}
        {result.isSuccess && (
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
