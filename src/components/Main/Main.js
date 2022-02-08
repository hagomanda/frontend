import React from "react";
import styled from "styled-components";

import MyGoalsList from "../MyGoals/MyGoalsList";
import Navbar from "../../Navbar";
import CreateButton from "../MyGoals/CreateButton";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Main() {
  return (
    <AppContainer>
      <MyGoalsList />
      <Navbar />
      <CreateButton />
    </AppContainer>
  );
}
