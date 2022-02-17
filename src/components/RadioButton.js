import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  padding: 15px 10px;
  border-radius: 4px;
  grid-template-columns: repeat(auto-fit, minmax(33%, auto));
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 4px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
`;

export default function RadioButton({ handleOnChange, options }) {
  const showButtons = () => {
    return options.slice(1).map(({ value, content }, i) => (
      <div key={i}>
        <StyledRadio
          type="radio"
          id={value}
          value={value}
          onChange={handleOnChange}
          name={options[0]}
          defaultChecked={i === 0}
        />
        <RadioLabel htmlFor={value}>{content}</RadioLabel>
      </div>
    ));
  };

  return <StyledDiv>{showButtons()}</StyledDiv>;
}

RadioButton.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
