import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";

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

export default function MandalBox({ content, role, goalId, onClick }) {
  const { id: mainGoalId } = useParams();
  const defaultValue = useRef(content);
  const isEditMode = useSelector(state => state.edit.mode);

  const box = useRef();

  const handleContent = event => {
    defaultValue.current = event.currentTarget.textContent;

    if (role === "main") {
      return axios.put(`/api/goals/mainGoal/${box.current.id}`, {
        title: defaultValue.current,
      });
    }

    if (role === "subGoals" || role === "submain") {
      return axios.put(`/api/goals/subGoal/${box.current.id}`, {
        title: defaultValue.current,
        mainGoalId,
      });
    }

    return axios.put(`/api/todos/${box.current.id}`, {
      title: defaultValue.current,
    });
  };

  return (
    <InnerBox className={role} onClick={onClick} id={goalId} ref={box}>
      <Content
        contentEditable={isEditMode}
        suppressContentEditableWarning={true}
        onInput={handleContent}
        spellCheck={false}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
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
