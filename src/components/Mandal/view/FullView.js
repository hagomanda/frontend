import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainMandal from "./MainMandal";
import SubMandal from "./SubMandal";

const MandalContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  & :nth-child(3n) {
    border-left: solid #e6e6e6 1px;
  }

  & :nth-child(-n + 3) {
    border-bottom: solid #e6e6e6 1px;
  }

  & :nth-child(3n + 1) {
    border-right: solid #e6e6e6 1px;
  }

  & :nth-child(3n) {
    border-left: solid #e6e6e6 1px;
  }

  & :nth-child(n + 7) {
    border-top: solid #e6e6e6 1px;
  }
`;

const MAIN_VIEW = "subGoals";
const SUB_VIEW = "todos";

const makeArray = (mandal, view) => {
  const results = [];
  mandal[view].forEach(({ title, level, _id }) => {
    results.push({ title, level, _id, role: view });
  });

  const { title, level } = mandal;
  results.splice(4, 0, {
    title,
    level,
    _id: mandal._id,
    role: view === SUB_VIEW ? "submain" : "main",
  });

  return results;
};

export default function FullView() {
  const data = useSelector(state => state.view.data);
  const mandalArray = data.subGoals.map(subGoal =>
    makeArray(subGoal, SUB_VIEW),
  );

  mandalArray.splice(4, 0, makeArray(data, MAIN_VIEW));

  const showFullMandal = () => {
    return mandalArray.map((mandal, i) => {
      if (i === 4) {
        return <MainMandal data={mandal} key={i} />;
      }
      return <SubMandal data={mandal} key={i} mandalIndex={i} />;
    });
  };

  return <MandalContainer>{showFullMandal()}</MandalContainer>;
}
