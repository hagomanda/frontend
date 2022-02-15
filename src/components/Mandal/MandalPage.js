import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { displayMain, displayFull, getMandal } from "../../features/viewSlice";
import { changeEditMode } from "../../features/editSlice";
import { VIEW_OPTION } from "../../constants";
import MainMandal from "./view/MainMandal";
import SubMandal from "./view/SubMandal";
import FullView from "./view/FullView";
import ShareButton from "./MandalHeader/ShareButton";
import GoBackButton from "./MandalHeader/GoBackButton";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 50px;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
`;

const EditButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.selected && "rgba(148, 178, 235, 0.5)"};
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 70vh;
`;

const BoxContainer = styled.div`
  height: 684px;
  width: 684px;
`;

const ToggleButton = styled.input`
  display: none;
  &:checked + label {
    background: #3c4963;
  }

  &:checked + label::after {
    background: #ffffff;
    left: 50px;
  }
`;

const ToggleLabel = styled.label`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 50px;

  background: rgba(148, 178, 235, 0.5);
  border-radius: 25px;
  text-indent: -9999em;
  transition: 0.4s ease-out;
  cursor: pointer;

  &:after {
    position: absolute;
    content: "";
    width: 40px;
    height: 40px;
    background: #ffffff;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    transition: 0.4s ease-out;
  }
`;

export default function MandalPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.view.isFetching);
  const viewOption = useSelector(state => state.view.option);
  const mandalArray = useSelector(state => state.view.displayed);
  const isEditMode = useSelector(state => state.edit.mode);
  const viewModeButton = useRef();

  useEffect(() => {
    if (viewOption !== VIEW_OPTION.MAIN_VIEW) {
      dispatch(displayMain());
    }
    dispatch(getMandal(id));
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      dispatch(getMandal(id));
    }
  }, [isEditMode]);

  useEffect(() => {
    if (viewOption !== VIEW_OPTION.FULL_VIEW) {
      viewModeButton.current.checked = false;
    }
  }, [viewOption]);

  const viewCheckHandler = event => {
    event.target.checked ? dispatch(displayFull()) : dispatch(displayMain());
  };

  const handleEdit = () => {
    dispatch(changeEditMode());
  };

  return (
    <>
      {isFetching && <div>123</div>}
      <div>
        <ButtonsContainer>
          <GoBackButton onClick={viewCheckHandler} />
          <EditButton
            className="editButton"
            alt="editButton"
            src="/icons/edit.svg"
            onClick={handleEdit}
            selected={isEditMode}
          />
          <ShareButton />
          <ToggleButton
            type="checkbox"
            id="toggle-slider"
            onChange={viewCheckHandler}
            ref={viewModeButton}
          />
          <ToggleLabel htmlFor="toggle-slider">on/off</ToggleLabel>
        </ButtonsContainer>
      </div>
      {!isFetching && (
        <BodyContainer>
          <BoxContainer>
            {viewOption === VIEW_OPTION.MAIN_VIEW && (
              <MainMandal data={mandalArray} />
            )}
            {viewOption === VIEW_OPTION.SUB_VIEW && (
              <SubMandal data={mandalArray} />
            )}
            {viewOption === VIEW_OPTION.FULL_VIEW && <FullView />}
          </BoxContainer>
        </BodyContainer>
      )}
    </>
  );
}
