import React from "react";

import MandalBox from "./MandalBox";

export const showBoxes = (data, handleClick) => {
  return data.map((box, index) => {
    return (
      <MandalBox
        content={String(box.title)}
        role={box.role}
        key={box["_id"]}
        goalId={box["_id"]}
        onClick={event => handleClick(event, index)}
      />
    );
  });
};
