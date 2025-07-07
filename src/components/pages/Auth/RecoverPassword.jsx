import React, { useState } from "react";
import Arrow from "@assets/images/icons/arrow-left.svg";
import { useForm } from "react-hook-form";
import Input from "@components/library/UI/Input";
import { Link } from "react-router-dom";
import { Button } from "@components/library";
import { useDispatch } from "react-redux";
import { recoverPassword } from "@actions";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";
import { toggleLoginModal } from "@actions/authModalsActions";

export const RecoverPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { __ } = useTranslation();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    const { email } = data;
    dispatch(recoverPassword({ email }))
      .then(() => {
        setLoading(false);
        reset();
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.log(e);
      });
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.reset_password")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setError(false)}
        className="auth-form"
      >
        <h2 className="auth-form__title">
          {__("auth.reset_pass_title")}
        </h2>{" "}
        <Input
          className={"auth.js-form__inp-wrap"}
          data={{
            label: `${__("common.email")}:`,
            type: "email",
            errors,
            error,
            settings: {
              ...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }),
            },
            message: `${__("error.email_format")}`,
            name: "email",
          }}
        />
        {error && (
          <p className="auth-form__error">{__("error.incorrect_email")}</p>
        )}
        <p className="auth-form__text">
          {__("auth.have_acc")}&nbsp; 
          <Link to={""} onClick={() => dispatch(toggleLoginModal(true))}>
            {__("auth.sign_in")}
          </Link>
        </p>{" "}
        <Button
          disabled={!isValid}
          className="auth-form__btn"
          type="submit"
          color="white"
          size="middle"
          isLoading={loading}
        >
          {__("auth.reset_pass")}
        </Button>
      </form>
    </>
  );
};

export default RecoverPassword;
