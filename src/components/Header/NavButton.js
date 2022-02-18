import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  height: 50%;
  margin: 0;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${props =>
    props.color === "white" ? "#ffffff" : "rgb(148, 178, 235)"};

  &:hover {
    background-color: #e5e5e5;
    cursor: pointer;
  }

  .buttonText {
    margin: 0 auto;
    text-align: center;
  }
`;

export default function NavButton({ textName, link }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = pathname.split("/")[1];
  const color =
    pathname === link
      ? "white"
      : route === "mainGoal" && link === "/home"
      ? "white"
      : "default";

  const handleLinkButtonOnClick = () => {
    navigate(link);
  };

  return (
    <ButtonWrapper onClick={handleLinkButtonOnClick} color={color}>
      <div className="buttonText">{textName}</div>
    </ButtonWrapper>
  );
}

NavButton.propTypes = {
  textName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
