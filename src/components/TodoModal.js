import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function TodoModal({ contents, date }) {
  const [memo, setMemo] = useState("");

  const handleSaveButtonClick = async () => {
    await axios.post(`/api/todos/memo/${contents._id}`, {
      date,
      memo,
    });
  };

  const handleDeleteButtonClick = async () => {
    await axios.delete(`/api/users/todos/${contents._id}`, {
      data: {
        date,
      },
    });
  };

  return (
    <>
      <p>
        {contents.title}Lv.{contents.level}
      </p>
      <textarea>{contents.addedInCalendar[date].memo}</textarea>
      <button onClick={handleSaveButtonClick}>Save</button>
      <button onClick={handleDeleteButtonClick}>Delete</button>
    </>
  );
}

TodoModal.propTypes = {
  contents: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
