import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToSubGoal } from "../../../features/viewSlice";

const InnerBox = styled.div`
  /* width: 100px;
  height: 100px; */
  /* border: solid black 1px; */
  box-sizing: border-box;
  border-radius: 10%;
  margin: 10px;
  &.sub {
    background-color: #f4f4f4;
    &:hover {
      background-color: rgb(148, 178, 235);
      cursor: pointer;
    }
  }

  &.main {
    background-color: rgb(148, 178, 235);
  }

  &.todo {
    background-color: rgb(148, 178, 235);
    &:hover {
      background-color: #f4f4f4;
      cursor: pointer;
    }
  }
`;

export default function MandalBox({ context, role, goalId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditMode = useSelector(state => state.edit.mode);
  const handleClickBox = event => {
    if (isEditMode) {
      if (id !== event.target.id) {
        return;
      }
      // 수정기능 추가
    } else {
      if (id === event.target.id) {
        return;
      }

      dispatch(changeToSubGoal(event.target.id));
    }
  };

  return (
    <InnerBox className={role} onClick={handleClickBox} id={goalId}>
      {context}
    </InnerBox>
  );
}

MandalBox.propTypes = {
  context: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  goalId: PropTypes.string.isRequired,
};
