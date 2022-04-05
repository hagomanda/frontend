import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { displayMain } from "../../../reducers/mandalSlice";

const GoBackContainer = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover {
      box-shadow: 0 0 0 3px rgb(148, 178, 235) inset;
    }
  }
`;

export default function GoBackButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewOption = useSelector(state => state.mandal.option);

  const handleGoBackButtonClick = () => {
    if (viewOption !== "mainGoal") {
      dispatch(displayMain());
      return;
    }

    navigate("/home");
  };

  return (
    <GoBackContainer onClick={handleGoBackButtonClick}>
      <div className="tooltip">
        <img src="/icons/back.svg" alt="go-back-button" />
        <span className="tooltiptext">뒤로가기</span>
      </div>
    </GoBackContainer>
  );
}
