import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MandalBox from "./MandalBox";

const getMainGoal = async id => {
  const res = await axios.get(`/api/goals/mainGoal/${id}`);
  return res;
};

const makeArray = (mandalart, id) => {
  const tempArray = [];
  mandalart.subGoals.forEach(({ title, level, _id }) => {
    tempArray.push({ title, level, _id, role: "sub" });
  });
  const { title, level } = mandalart;
  tempArray.splice(4, 0, { title, level, _id: id, role: "main" });

  return tempArray;
};

const BoxContatiner = styled.div`
  display: grid;
  height: 684px;
  width: 684px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function MainGoalPage() {
  const { id } = useParams();
  const [mandalart, setMandalart] = useState();
  const [mandalartArray, setMandalartArray] = useState([]);
  const loginState = useSelector(state => state.user.loginSucceed);
  useEffect(() => {
    if (loginState) {
      const getMandalart = async () => {
        const res = await getMainGoal(id);
        setMandalart(res.data.result.mainGoal);
      };
      getMandalart();
    }
  }, [loginState]);

  useEffect(() => {
    if (!mandalart) {
      return;
    }

    setMandalartArray(makeArray(mandalart, id));
  }, [mandalart]);

  const showBoxes = () => {
    return mandalartArray.map(box => {
      return (
        <MandalBox
          context={String(box.title)}
          role={box.role}
          key={box["_id"]}
          goalId={box["_id"]}
        />
      );
    });
  };

  return <BoxContatiner className="gridContainer">{showBoxes()}</BoxContatiner>;
}
