import React from "react";
import styled from "styled-components";

import MyGoalsList from "../MyGoals/MyGoalsList";
import CreateButton from "../MyGoals/CreateButton";

const MainHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const MyGoalsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Main() {
  return (
    <>
      <MainHeader>
        <span>나의 만다라트</span>
      </MainHeader>
      <MyGoalsContainer>
        <MyGoalsList />
        <CreateButton />
      </MyGoalsContainer>
    </>
  );
}
