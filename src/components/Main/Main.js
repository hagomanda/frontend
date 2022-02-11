import React from "react";
import styled from "styled-components";

import Navbar from "../../Navbar";
import MyGoalsList from "../MyGoals/MyGoalsList";
import CreateButton from "../MyGoals/CreateButton";
import Logout from "../Logout";

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
      <Logout />
    </AppContainer>
  );
}
