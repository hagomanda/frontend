import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { displayMain } from "../../../reducers/mandalSlice";

const GoBackContainer = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;

  .tooltip {
    position: relative;
    display: block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgb(148, 178, 235);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
  }

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
        <img src="/icons/back.svg" />
        <span className="tooltiptext ">뒤로가기</span>
      </div>
    </GoBackContainer>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
