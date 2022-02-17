import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import _ from "lodash";

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

  &.subGoals,
  &.todos {
    background-color: #f4f4f4;
    &:hover {
      box-shadow: 0 0 0 3px rgb(148, 178, 235) inset;
      cursor: pointer;
    }
  }

  &.main,
  &.submain {
    background-color: rgb(148, 178, 235);
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

export default function MandalBox({ content, role, goalId, onClick }) {
  const { id: mainGoalId } = useParams();
  const isEditMode = useSelector(state => state.edit.mode);
  const viewOption = useSelector(state => state.mandal.option);
  const dispatch = useDispatch();

  const box = useRef();

  // const debouncedModifyMandal = _.debounce((boxRole, title) => {
  //   dispatch(
  //     modifyMandal({
  //       boxRole,
  //       title,
  //       mainGoalId,
  //       boxId: box.current.id,
  //     }),
  //   );
  // }, 500); // 디바운스 관련 차후 수정 예정

  const handleContent = async event => {
    const newText = event.currentTarget.innerHTML;

    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      return;
    }

    dispatch(
      modifyMandal({
        role,
        title: newText,
        mainGoalId,
        boxId: box.current.id,
      }),
    );
    // debouncedModifyMandal(boxRole, newText); 디바운스 걸면 구현은 되는데 에러콘솔 찍힘.
  };

  return (
    <InnerBox className={role} onClick={onClick} id={goalId} ref={box}>
      <Content
        contentEditable={isEditMode}
        suppressContentEditableWarning={true}
        onBlur={handleContent}
        onInput={handleContent}
        spellCheck={false}
        dangerouslySetInnerHTML={{ __html: content }}
        fontSize={viewOption === VIEW_OPTION.FULL_VIEW ? "7px" : "1em"}
      />
    </InnerBox>
  );
}

MandalBox.propTypes = {
  content: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  goalId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
