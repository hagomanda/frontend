import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin: 0;
  padding: 15px;
  width: 3%;
  height: 15%;
  border: 1px solid black;
  border-radius: 0 20px 20px 0;

  &:hover {
    background-color: rgb(148, 178, 235);
    cursor: pointer;
  }

  .buttonText {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4em;
    height: 4em;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    background-color: transparent;
  }
`;

export default function NavButton({ textName, link }) {
  const navigate = useNavigate();

  const handleLinkButtonOnClick = () => {
    navigate(link);
  };

  return (
    <ButtonContainer>
      <ButtonWrapper onClick={handleLinkButtonOnClick}>
        <div className="buttonText">{textName}</div>
      </ButtonWrapper>
    </ButtonContainer>
  );
}

NavButton.propTypes = {
  textName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
