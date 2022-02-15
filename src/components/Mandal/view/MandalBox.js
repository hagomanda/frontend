import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import { socket } from "../../../features/socket";
import { VIEW_OPTION, ROLE } from "../../../constants";

const InnerBox = styled.div`
  border-radius: 10%;
  margin: 10px;

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

const Content = styled.div`
  text-align: center;
  outline: none;
`;

const modifyMandal = _.debounce(async (role, box, newText, mainGoalId) => {
  let modifiedMandal = null;
  switch (role) {
    case ROLE.MAIN:
      modifiedMandal = await axios.put(
        `/api/goals/mainGoal/${box.current.id}`,
        {
          title: newText,
        },
      );
      break;
    case ROLE.SUBGOAL || ROLE.SUBMAIN:
      modifiedMandal = await axios.put(`/api/goals/subGoal/${box.current.id}`, {
        title: newText,
        mainGoalId,
      });
      break;
    case ROLE.TODO:
      modifiedMandal = await axios.put(`/api/todos/${box.current.id}`, {
        title: newText,
        mainGoalId,
      });
      break;
  }
  socket.emit("edit", modifiedMandal.data.data, mainGoalId);
}, 500);

export default function MandalBox({ content, role, goalId, onClick }) {
  const { id: mainGoalId } = useParams();
  const isEditMode = useSelector(state => state.edit.mode);
  const viewOption = useSelector(state => state.view.option);

  const box = useRef();

  const handleContent = async event => {
    const newText = event.currentTarget.innerHTML;

    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      return;
    }
    modifyMandal(role, box, newText, mainGoalId);
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
