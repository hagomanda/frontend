import React from "react";
import PropTypes from "prop-types";

export default function DeletePopup({ onClick }) {
  return (
    <div>
      <span>만다라트를 삭제합니다.</span>
      <button onClick={onClick}>확인했어요</button>
    </div>
  );
}

DeletePopup.propTypes = {
  onClick: PropTypes.func.isRequired,
};
