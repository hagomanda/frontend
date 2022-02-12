import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { displayMain, displaySub } from "../../../features/viewSlice";
import { showBoxes } from "./utils";
import { VIEW_OPTION } from "../../../constants";

const BoxContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  & :nth-child(n) {
    border: none;
  }
`;

export default function SubMandal({ data, mandalIndex }) {
  const dispatch = useDispatch();
  const viewOption = useSelector(state => state.view.option);
  const isEditMode = useSelector(state => state.edit.mode);

  const handleBoxClick = (event, index) => {
    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      dispatch(displaySub(mandalIndex));
      return;
    }

    if (isEditMode) {
      event.target.children[0]?.focus();
      return;
    }

    if (index === 4) {
      dispatch(displayMain());
    }
  };

  return (
    <BoxContainer className="gridContainer">
      {showBoxes(data, handleBoxClick)}
    </BoxContainer>
  );
}

SubMandal.propTypes = {
  data: PropTypes.array.isRequired,
  mandalIndex: PropTypes.number,
};
