import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

import MainMandal from "./view/MainMandal";
import SubMandal from "./view/SubMandal";
import FullView from "./view/FullView";

import { displayMain, displayFull, getMandal } from "../../features/viewSlice";
import { changeEditMode } from "../../features/editSlice";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
`;

const ImageButton = styled.img`
  width: 50px;
  height: 50px;

  cursor: pointer;
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
  const viewModeButton = useRef();

  useEffect(() => {
    dispatch(getMandal(id));
  }, []);

  useEffect(() => {
    if (viewOption !== "full") {
      viewModeButton.current.checked = false;
    }
  }, [viewOption]);

  const viewCheckHandler = event => {
    event.target.checked ? dispatch(displayFull()) : dispatch(displayMain());
  };

  const handleEdit = () => {
    dispatch(changeEditMode());
  };
  const handleShare = async () => {
    await axios.delete("/api/todos/6205d66b9f17beadd1cdec7b", {
      data: {
        date: new Date("2022.02.17"),
      },
    });
    // await axios.post("/api/goals/mainGoal", {
    //   title: "123123",
    // });
    // await axios.get("api/todos");
  };
  // view option 에 따라 MainGoal, SubGoal, FullView보여줌
  // 공유, 채팅, 로그아웃, 소켓 설정 예정
  return (
    <>
      {isFetching && <div>123</div>}
      <ButtonsContainer>
        <ToggleButton
          type="checkbox"
          id="toggle-slider"
          onChange={viewCheckHandler}
          ref={viewModeButton}
        />
        <ToggleLabel htmlFor="toggle-slider">on/off</ToggleLabel>
        <ImageButton
          className="editButton"
          alt="editButton"
          src="../img/edit.png"
          onClick={handleEdit}
        />
        <ImageButton
          className="shareButton"
          alt="shareButton"
          src="../img/share.png"
          onClick={handleShare}
        />
      </ButtonsContainer>
      {!isFetching && (
        <BodyContainer>
          <BoxContainer>
            {viewOption === "mainGoal" && <MainMandal data={mandalArray} />}
            {viewOption === "subGoal" && <SubMandal data={mandalArray} />}
            {viewOption === "full" && <FullView />}
          </BoxContainer>
        </BodyContainer>
      )}
    </>
  );
}
