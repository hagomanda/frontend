import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MyGoalsEntry from "./MyGoalsEntry";

const GoalsContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 5px;
`;

const goalApi = async () => {
  const res = await axios.get("/api/users/goals");
  return res;
};

export default function MyGoalsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const loginState = useSelector(state => state.user.loginSucceed);

  const getData = async () => {
    const { data } = await goalApi();
    console.log(data.result);
    setData(data.result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (loginState) {
      getData();
    }
  }, [loginState]);

  return (
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
  );
}
