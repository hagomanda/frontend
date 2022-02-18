import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CreateGoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  input {
    width: 400px;
    height: 50px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid black;
    background-color: #ffffff;
    font-size: 16px;

    :focus {
      outline: none;
    }
  }

  button {
    width: 40%;
    height: 60px;
    padding: 0 15px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    margin-top: 120px;
    background-color: #374661;
    color: #dce7f3;

    &:hover {
      cursor: pointer;
      border: none;
      background-color: #2d3347;
    }
  }
`;

export default function CreateGoal({ onClick }) {
  const [title, setTitle] = useState("");

  return (
    <CreateGoalContainer>
      <div>
        <input
          type="text"
          value={title}
          placeholder="이번에 달성할 목표는..."
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        <button onClick={() => onClick(title)}>만들기</button>
      </div>
    </CreateGoalContainer>
  );
}

CreateGoal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
