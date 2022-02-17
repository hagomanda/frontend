import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { displayMain, displaySub } from "../../../reducers/mandalSlice";
import { VIEW_OPTION } from "../../../constants";
import { showBoxes } from "./utils";

import Modal from "../../Modal/Modal";
import Todo from "./Todo";

const BoxContainer = styled.div`
  display: inline-grid;
  height: ${props => props.size};
  width: ${props => props.size};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

export default function SubMandal({ data, mandalIndex }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [boxId, setBoxId] = useState();
  const viewOption = useSelector(state => state.mandal.option);
  const isEditMode = useSelector(state => state.edit.mode);

  const handleBoxClick = (event, index) => {
    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      mandalIndex <= 4
        ? dispatch(displaySub(mandalIndex))
        : dispatch(displaySub(mandalIndex - 1));
      return;
    }

    if (isEditMode) {
      event.target.children[0]?.focus();
      return;
    }

    if (index === 4) {
      return dispatch(displayMain());
    }

    setBoxId(event.target.id);
    setShowModal(true);
  };

  return (
    <>
      <BoxContainer
        className="gridContainer"
        size={viewOption === VIEW_OPTION.FULL_VIEW ? "25vh" : "70vh"}
      >
        {showBoxes(data, handleBoxClick)}
      </BoxContainer>
      {showModal && (
        <Modal
          onClick={() => setShowModal(!showModal)}
          child={
            <Todo
              id={boxId}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          }
        />
      )}
    </>
  );
}

SubMandal.propTypes = {
  data: PropTypes.array.isRequired,
  mandalIndex: PropTypes.number,
};
