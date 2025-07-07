import React, { useEffect, useState } from "react";
import { useTranslation } from "@helpers/translate";

const PasswordRequirements = ({ password }) => {
  const [passwordValid, setPasswordValid] = useState({});
  const { __ } = useTranslation();

  const isValidValue = () => {
    if (password) {
      const hasMinLength = password.length >= 8;
      const hasNumbersAndLetters = /^(?=.*\d)(?=.*[a-zA-Z])/.test(password);
      const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
        password
      );
      return { hasMinLength, hasNumbersAndLetters, hasSpecialCharacters };
    }

    return {};
  };

  useEffect(() => {
    setPasswordValid(isValidValue());
  }, [password]);

  const checkClass = (type) => {
    if (Object.keys(passwordValid).length) {
      if (passwordValid[type]) {
        return "success";
      } else {
        return "fail";
      }
    } else return "";
  };

  return (
    <ul className="auth-form__list-pattern list-pattern">
      <li className={`list-pattern__item ${checkClass("hasMinLength")}`}>
        <p className="list-pattern__text">{__("auth.requirements1")}</p>
      </li>

      <li
        className={`list-pattern__item ${checkClass("hasNumbersAndLetters")}`}
      >
        <p className="list-pattern__text">{__("auth.requirements2")}</p>
      </li>

      <li
        className={`list-pattern__item ${checkClass("hasSpecialCharacters")}`}
      >
        <p className="list-pattern__text">{__("auth.requirements3")}</p>
      </li>
    </ul>
  );
};

export default PasswordRequirements;
