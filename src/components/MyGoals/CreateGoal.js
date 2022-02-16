import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CreateGoalContainer = styled.div`
  text-align: center;
`;

export default function CreateGoal({ onClick }) {
  const [title, setTitle] = useState("");

  return (
    <CreateGoalContainer>
      <input
        type="text"
        value={title}
        placeholder="이번에 달성할 목표는..."
        onChange={event => setTitle(event.target.value)}
      ></input>
      <button onClick={() => onClick(title)}>만들기</button>
    </CreateGoalContainer>
  );
}

CreateGoal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
