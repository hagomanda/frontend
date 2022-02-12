import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { socketAction } from "../../features/socket";
import MyGoalsEntry from "./MyGoalsEntry";
import { getGoalList } from "../../reducers/goalListSlice";

const GoalsContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 5px;
`;

export default function MyGoalsList() {
  const loginState = useSelector(state => state.user.loginSucceed);
  const dispatch = useDispatch();

  const data = useSelector(state => state.goalList.data);
  const isLoading = useSelector(state => state.goalList.isFetching);

  useEffect(() => {
    if (!loginState) {
      socketAction.leaveMandal();
    }
  }, [loginState]);

  useEffect(() => {
    dispatch(getGoalList());
  }, []);

  return (
    <>
      <GoalsContainer>
        {isLoading ? (
          <div>로딩 중</div>
        ) : !data.length ? (
          <div>아직 만다라트가 없어요!</div>
        ) : (
          data.map(element => {
            return (
              <MyGoalsEntry
                key={element._id}
                id={element._id}
                title={element.title}
              />
            );
          })
        )}
      </GoalsContainer>
    </>
  );
}
