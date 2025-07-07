import React, { useEffect, useState } from "react";
import Arrow from "@assets/images/icons/arrow-left.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "@components/library/UI/Input";
import { useForm } from "react-hook-form";
import { Button } from "@components/library";
import PasswordRequirements from "@components/pages/Auth/components/PasswordRequirements";
import axios from "@helpers/axios/public.axios";
import { useDispatch } from "react-redux";
import { createPassword } from "@actions/auth";
import { useTranslation } from "@helpers/translate";
import { UPDATED_PASSWORD } from "../../../constants";

export const CreatePassword = () => {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true);
  const [myCode, setMyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { code, email } = useParams();
  const { __ } = useTranslation();

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("new_password");

  useEffect(() => {
    if (email && code) {
      axios
        .post("/check-code", { email, code })
        .then(() => {
          setMyCode(code);
        })
        .catch(() => navigate("/", { replace: true }));
    } else {
      navigate("/");
    }
  }, []);

  const onSubmit = (data) => {
    console.log("RESULT", data, myCode);
    const { new_password } = data;

    dispatch(createPassword({ myCode, new_password }))
      .then(() => {
        setLoading(false);
        navigate(UPDATED_PASSWORD, { replace: true });
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <Link to="/auth/login" className="auth-form__back">
        <img src={Arrow} alt="back" />
        {__("common.back_to_login")}
      </Link>

      <h2 className="auth-form__title">{__("auth.create_password")}</h2>
      <p className="auth-form__text">{__("auth.create_password_text")}</p>

      <Input
        className="auth-form__inp-wrap"
        data={{
          label: `${__("auth.new_password")}:`,
          type: isTypePassword ? "password" : "text",
          placeholder: `${__("auth.new_password")}:`,
          errors,
          settings: {
            ...register("new_password", {
              required: true,
              minLength: 8,
              // pattern:
              // /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
            }),
          },
          name: "password",
        }}
      >
        <button
          type="button"
          className={`bo-input__icon bo-input__icon--eye ${
            !isTypePassword ? "open" : ""
          }`}
          onClick={() => setIsTypePassword(!isTypePassword)}
        ></button>
      </Input>

      <Input
        className="auth-form__inp-wrap"
        data={{
          label: `${__("auth.confirm_password")}:`,
          type: isTypeConfirmPassword ? "password" : "text",
          placeholder: `${__("auth.confirm_password")}:`,
          errors,
          settings: {
            ...register("confirmPassword", {
              required: true,
              validate: (value) => value === getValues().new_password,
            }),
          },
          message: `${__("error.pass_required")}`,
          name: "confirmPassword",
        }}
      >
        <button
          type="button"
          className={`bo-input__icon bo-input__icon--eye ${
            !isTypeConfirmPassword ? "open" : ""
          }`}
          onClick={() => setIsTypeConfirmPassword(!isTypeConfirmPassword)}
        ></button>
      </Input>

      <Button
        className="auth-form__btn"
        disabled={!isValid}
        size="middle"
        type="submit"
        color="white"
        isLoading={loading}
      >
        {__("auth.update_password")}
      </Button>

      <PasswordRequirements password={password} />
    </form>
  );
};

export default CreatePassword;
