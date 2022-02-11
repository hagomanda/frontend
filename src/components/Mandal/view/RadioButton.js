import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  display: grid;
  width: 200px;
  padding: 15px 10px;
  border-radius: 4px;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  overflow: hidden;
`;

const StyledRadio = styled.input`
  display: none;
  + label {
    background-color: #fff;
    color: #333;
  }

  &:checked + label {
    background-color: #333;
    color: #fff;
  }
`;

const RadioLabel = styled.label`
  padding: 15px 10px;
  display: inline-block;
  cursor: pointer;
  height: 18px;
  min-width: 50%;
  border: 1px solid #333;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
`;

export default function RadioButton({ handleOnChange, options }) {
  const showButons = () => {
    return options.slice(1).map(({ value, content }, i) => (
      <>
        <StyledRadio
          type="radio"
          id={value}
          value={value}
          onChange={handleOnChange}
          name={options[0]}
          defaultChecked={i === 0}
        />
        <RadioLabel htmlFor={value}>{content}</RadioLabel>
      </>
    ));
  };

  return <StyledDiv>{showButons()}</StyledDiv>;
}

RadioButton.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
