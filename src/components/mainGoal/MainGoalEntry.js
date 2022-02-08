import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vh;
  height: 30vh;
  margin: 5px;
  text-align: center;
  background-color: rgb(148, 178, 235);
  border-radius: 5px;

  .title {
    margin: 2vw;
    font-size: 1.5em;
  }
`;

export default function MainGoalEntry({ title, onClick }) {
  return (
    <ThumbnailContainer onClick={onClick}>
      <p className="title">{title}</p>
    </ThumbnailContainer>
  );
}

MainGoalEntry.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
