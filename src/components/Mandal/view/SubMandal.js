import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import MandalBox from "./MandalBox";
import { displayMain } from "../../../features/viewSlice";

const BoxContainer = styled.div`
  display: grid;
  height: 684px;
  width: 684px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function SubMandal() {
  const data = useSelector(state => state.view.displayed);
  const dispatch = useDispatch();

  const handleBoxClick = index => {
    if (index === 4) {
      dispatch(displayMain());
    }
  };

  const showBoxes = () => {
    return data.map((box, index) => {
      return (
        <MandalBox
          context={String(box.title)}
          role={box.role}
          key={box["_id"]}
          goalId={box["_id"]}
          onClick={() => handleBoxClick(index)}
        />
      );
    });
  };

  return <BoxContainer className="gridContainer">{showBoxes()}</BoxContainer>;
}
