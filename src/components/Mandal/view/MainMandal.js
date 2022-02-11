import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MandalBox from "./MandalBox";
import { displaySub } from "../../../features/viewSlice";

const BoxContainer = styled.div`
  display: grid;
  height: 684px;
  width: 684px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function MainMandal() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(state => state.view.displayed);
  const isEditMode = useSelector(state => state.edit.mode);

  const handleBoxClick = (event, index) => {
    if (isEditMode) {
      if (id !== event.target.id) {
        return;
      }
      // 수정기능 추가
    } else {
      if (id === event.target.id) {
        return;
      }

      dispatch(displaySub(index));
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
          onClick={event => handleBoxClick(event, index)}
        />
      );
    });
  };

  return <BoxContainer className="gridContainer">{showBoxes()}</BoxContainer>;
}
