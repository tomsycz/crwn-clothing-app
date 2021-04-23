import React from "react";

import "./from-input.styles.scss";

function formInput({ handleChange, label, ...otherProps }) {
  return (
    <div className="group">
      <input
        className="form-input"
        type="text"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

export default formInput;
