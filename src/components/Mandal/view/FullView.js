import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MainMandal from "./MainMandal";
import SubMandal from "./SubMandal";

const MandalContainer = styled.div`
  display: inline-grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  > div:nth-child(3n) {
    border-left: 1px solid #e6e6e6;
  }

  > div:nth-child(-n + 3) {
    border-bottom: 1px solid #e6e6e6;
  }

  > div:nth-child(3n + 1) {
    border-right: 1px solid #e6e6e6;
  }

  > div:nth-child(n + 7) {
    border-top: 1px solid #e6e6e6;
  }

  > div:first-child {
    animation: fadeInDiagonallyToTheTLeftTop 1s;
  }

  > div:nth-child(2) {
    animation: fadeInTop 1s;
  }

  > div:nth-child(3) {
    animation: fadeInDiagonallyToTheTRightTop 1s;
  }

  > div:nth-child(4) {
    animation: fadeInLeft 1s;
  }

  > div:nth-child(6) {
    animation: fadeInRight 1s;
  }

  > div:nth-child(7) {
    animation: fadeInDiagonallyToTheTLeftDown 1s;
  }

  > div:nth-child(8) {
    animation: fadeInBottom 1s;
  }

  > div:nth-child(9) {
    animation: fadeInDiagonallyToTheTRightDown 1s;
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
  const data = useSelector(state => state.mandal.data);
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
