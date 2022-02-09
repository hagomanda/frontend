import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DateContainder = styled.div`
  border: solid black 1px;
  border-collapse: collapse;
  width: 100px;
  height: 600px;
`;

const DateBox = styled.div`
  border-top: solid black 1px;
  text-align: center;
`;

export default function CalenderBox({ day, date, todo }) {
  console.log(date, todo);
  return (
    <DateContainder>
      {day}
      <DateBox>{date}</DateBox>
    </DateContainder>
  );
}

CalenderBox.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string,
  todo: PropTypes.instanceOf(Array),
};
