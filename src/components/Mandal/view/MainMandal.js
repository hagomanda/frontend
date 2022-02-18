import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { displayMain, displaySub } from "../../../reducers/mandalSlice";
import { VIEW_OPTION } from "../../../constants";
import { showBoxes } from "./utils";
// import { socketAction } from "../../../features/socket";

const BoxContainer = styled.div`
  display: inline-grid;
  height: ${props => props.size};
  width: ${props => props.size};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

export default function MainMandal({ data }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditMode = useSelector(state => state.edit.mode);
  const viewOption = useSelector(state => state.mandal.option);
  // const user = useSelector(state => state.user.user);

  const handleBoxClick = (event, index) => {
    event.stopPropagation();
    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      dispatch(displayMain());
      return;
    }

    if (isEditMode) {
      // if (event.target.children.length === 0) {
      //   socketAction.selectMandalBox(user, event.target.parentElement.id);
      // } else {
      //   socketAction.selectMandalBox(user, event.target.id);
      // }
      // event.target.children[0]?.focus();
      // console.log(user);
      return;
    }

    if (id === event.target.id || event.target.id === "") {
      return;
    }

    index <= 4 ? dispatch(displaySub(index)) : dispatch(displaySub(index - 1));
  };

  return (
    <BoxContainer
      className="gridContainer"
      size={viewOption === VIEW_OPTION.FULL_VIEW ? "25vh" : "70vh"}
    >
      {showBoxes(data, handleBoxClick)}
    </BoxContainer>
  );
}

MainMandal.propTypes = {
  data: PropTypes.array.isRequired,
};
