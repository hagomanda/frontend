import React, { useEffect, useState } from "react";
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

const makeArray = mandal => {
  const results = [];

  mandal.todos.forEach(({ title, level, _id }) => {
    results.push({ title, level, _id, role: "todo" });
  });

  const { title, level } = mandal;
  results.splice(4, 0, { title, level, _id: mandal._id, role: "sub" });

  return results;
};

export default function SubMandal() {
  const [mandalArray, setMandalArray] = useState([]);
  const data = useSelector(state => state.mandal.displayed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(data).length) {
      return;
    }

    setMandalArray(makeArray(data));
  }, [data]);

  const handleBoxClick = index => {
    if (index === 4) {
      dispatch(displayMain());
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
          onClick={() => handleBoxClick(index)}
        />
      );
    });
  };

  return <BoxContainer className="gridContainer">{showBoxes()}</BoxContainer>;
}
