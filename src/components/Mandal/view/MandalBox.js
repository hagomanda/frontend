import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";

const InnerBox = styled.div`
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
    &:hover {
      box-shadow: 0 0 0 3px #cccccd inset;
    }
  }

  &.submain {
    background-color: rgb(148, 178, 235);
    &:hover {
      box-shadow: 0 0 0 3px #cccccd inset;
      cursor: pointer;
    }
  }
`;

const Context = styled.div`
  text-align: center;
  outline: none;
`;

export default function MandalBox({ context, role, goalId, onClick }) {
  const isEditMode = useSelector(state => state.edit.mode);
  const giveContentEditable = event => {
    event.target.contentEditable = true;
  };

  return (
    <InnerBox className={role} onClick={onClick} id={goalId}>
      <Context contentEditable={isEditMode}>{context}</Context>
    </InnerBox>
  );
}

MandalBox.propTypes = {
  context: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  goalId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
