import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { displayMain } from "../../../features/viewSlice";
import { useNavigate } from "react-router-dom";

const GoBackContainer = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function GoBackButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewOption = useSelector(state => state.view.option);

  const handleGoBackButtonClick = () => {
    if (viewOption !== "mainGoal") {
      dispatch(displayMain());
      return;
    }

    navigate("/home");
  };

  return (
    <GoBackContainer onClick={handleGoBackButtonClick}>
      <img src="/icons/back.svg" />
    </GoBackContainer>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
