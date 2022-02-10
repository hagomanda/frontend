import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DateContainer = styled.div`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100px;
  height: 600px;
`;

const DateBox = styled.div`
  border-top: 1px solid black;
  text-align: center;
`;

export default function CalendarBox({ day, date, todo }) {
  return (
    <DateContainer>
      {day}
      <DateBox>{date}</DateBox>
    </DateContainer>
  );
}

CalendarBox.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string,
  todo: PropTypes.instanceOf(Array),
};
