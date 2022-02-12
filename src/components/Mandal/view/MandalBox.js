import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InnerBox = styled.div`
  /* width: 100px;
  height: 100px; */
  /* border: solid black 1px; */
  border-radius: 10%;
  margin: 10px;

  &.sub {
    background-color: #f4f4f4;
    &:hover {
      box-shadow: 0 0 0 3px rgb(148, 178, 235) inset;
      cursor: pointer;
    }
  }

  &.main {
    background-color: rgb(148, 178, 235);
  }

  &.submain {
    background-color: rgb(148, 178, 235);
    &:hover {
      box-shadow: 0 0 0 3px #cccccd inset;
      cursor: pointer;
    }
  }
`;

// MandalBox가 handleClick props 내려받을 수 있도록 (MandalPage에서)
export default function MandalBox({ context, role, goalId, onClick }) {
  return (
    <InnerBox className={role} onClick={onClick} id={goalId}>
      {context}
    </InnerBox>
  );
}

MandalBox.propTypes = {
  context: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  goalId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
