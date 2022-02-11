import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import MandalBox from "./MandalBox";
import { getMandal, displaySub } from "../../../features/viewSlice";

const makeArray = (mandal, id) => {
  const tempArray = [];
  mandal.subGoals.forEach(({ title, level, _id }) => {
    tempArray.push({ title, level, _id, role: "sub" });
  });
  const { title, level } = mandal;
  tempArray.splice(4, 0, { title, level, _id: id, role: "main" });

  return tempArray;
};

const BoxContainer = styled.div`
  display: grid;
  height: 684px;
  width: 684px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function MainMandal() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(state => state.mandal.displayed);
  const loginState = useSelector(state => state.user.loginSucceed);
  const isEditMode = useSelector(state => state.edit.mode);
  const [mandalArray, setMandalArray] = useState([]);

  useEffect(() => {
    if (loginState) {
      dispatch(getMandal(id));
    }
  }, [loginState]);

  useEffect(() => {
    if (!Object.keys(data).length) {
      return;
    }

    setMandalArray(makeArray(data, id));
  }, [data]);

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
    return mandalArray.map((box, index) => {
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
