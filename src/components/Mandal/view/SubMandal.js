import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import MandalBox from "./MandalBox";

const BoxContainer = styled.div`
  display: grid;
  height: 684px;
  width: 684px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const getMainGoal = async id => {
  const res = await axios.get(`/api/goals/mainGoal/${id}`);
  return res;
};

const getSubGoal = (res, id) => {
  const { subGoals } = res.data.result.mainGoal;

  for (let i = 0; i < subGoals.length; i++) {
    if (subGoals[i]._id === id) {
      return subGoals[i];
    }
  }
};

const makeArray = mandal => {
  const results = [];

  mandal.todos.forEach(({ title, level, _id }) => {
    results.push({ title, level, _id, role: "todo" });
  });

  const { title, level } = mandal;
  results.splice(4, 0, { title, level, _id: mandal._id, role: "sub" });

  return results;
};

export default function SubMandal({ selected }) {
  const { id } = useParams();
  const [mandal, setMandal] = useState({});
  const [mandalArray, setMandalArray] = useState([]);
  const loginState = useSelector(state => state.user.loginSucceed);

  useEffect(() => {
    const getMandal = async () => {
      const res = await getMainGoal(id);
      setMandal(getSubGoal(res, selected));
    };

    if (loginState) {
      getMandal();
    }
  }, [loginState]);

  useEffect(() => {
    if (!Object.keys(mandal).length) {
      return;
    }

    setMandalArray(makeArray(mandal));
  }, [mandal]);

  const showBoxes = () => {
    return mandalArray.map(box => {
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

  return <BoxContainer className="gridContainer">{showBoxes()}</BoxContainer>;
}

SubMandal.propTypes = {
  selected: PropTypes.string.isRequired,
};
