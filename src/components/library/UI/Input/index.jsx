import React from "react";

import "./input.sass";

export const Input = ({ className = "", data, children }) => {
  const {
    label,
    type,
    placeholder,
    errors = {},
    settings,
    message,
    name,
    error = false,
  } = data;

  return (
    <div className={`bo-input ${className}`}>
      <label className="bo-input__label">
        {label && <p className="bo-input__label-text">{label}</p>}
        <div className="bo-input__wrap">
          <input
            type={type}
            placeholder={placeholder}
            className={`${
              errors[name] || error ? "error" : ""
            } bo-input__input`}
            {...settings}
          />
          {children}
        </div>
        {errors[name] && (
          <p className="bo-input__error">
            {errors[name].message ? errors[name].message : message}
          </p>
        )}
      </label>
    </div>
  );
};

export default Input;
