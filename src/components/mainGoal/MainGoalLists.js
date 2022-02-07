import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainGoalEntry from "./MainGoalEntry";

const GoalsContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 5px;
`;

const useMockData = true;

const goalApi = async () => {
  if (useMockData) {
    const res = await fetch("/maingoal.json");
    const data = await res.json();
    return data;
  }
};

export default function MainGoalLists() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    const { result } = await goalApi();
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEntryClick = () => {
    console.log("clicked");
  };

  return (
    <GoalsContainer>
      {isLoading ? (
        <div>로딩 중</div>
      ) : !data.length ? (
        <div>아직 만다라트가 없어요!</div>
      ) : (
        data.map(element => {
          return (
            <MainGoalEntry
              key={element._id}
              title={element.title}
              onClick={handleEntryClick}
            />
          );
        })
      )}
    </GoalsContainer>
  );
}
