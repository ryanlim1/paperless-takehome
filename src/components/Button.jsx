/* eslint-disable react/prop-types */
import React from "react";

function Button({ id, text, onSubmit }) {
  return (
    <div>
      <button type="button" id={id} onClick={() => onSubmit()}>
        {text}
      </button>
    </div>
  );
}

export default Button;
