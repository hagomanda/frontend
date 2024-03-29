import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";

import { VIEW_OPTION } from "../../../constants";
import { modifyMandal } from "../../../reducers/mandalSlice";

const InnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  margin: 5px;
  padding: 3px;
  overflow: hidden;

  &.subGoals {
    background-color: #c6e0ff;

    &:hover {
      box-shadow: 0 0 0 3px #cccccd inset;
    }
  }

  &.todos {
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
    background-color: #c6e0ff;

    &:hover {
      box-shadow: 0 0 0 3px #cccccd inset;
    }
  }
`;

const Content = styled.p`
  text-align: center;
  word-break: break-all;
  font-size: ${props => props.fontSize};
  outline: none;
`;

export default function MandalBox({ content, role, goalId, onClick, color }) {
  const { id: mainGoalId } = useParams();
  const isEditMode = useSelector(state => state.edit.mode);
  const viewOption = useSelector(state => state.mandal.option);
  const dispatch = useDispatch();

  const box = useRef();

  const debouncedModifyMandal = _.debounce((role, title) => {
    dispatch(
      modifyMandal({
        role,
        title,
        mainGoalId,
        boxId: box.current.id,
      }),
    );
  }, 500);

  const handleContent = async event => {
    const newText = event.currentTarget.innerText.replace(/[\r\n]+/gm, " ");

    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      return;
    }

    debouncedModifyMandal(role, newText);
  };

  return (
    <InnerBox
      className={role}
      onClick={onClick}
      id={goalId}
      ref={box}
      color={color}
    >
      <Content
        onClick={onClick}
        id={goalId}
        contentEditable={isEditMode}
        suppressContentEditableWarning={true}
        onBlur={handleContent}
        onInput={handleContent}
        spellCheck={false}
        fontSize={viewOption === VIEW_OPTION.FULL_VIEW ? "7px" : "1em"}
      >
        {content}
      </Content>
      {/* <p>lv: {level}</p> */}
    </InnerBox>
  );
}

MandalBox.propTypes = {
  content: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  goalId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  level: PropTypes.number,
};
