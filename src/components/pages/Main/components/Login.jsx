import React, { useState, useMemo } from "react";
import { Link, redirect } from "react-router-dom";
import Input from "@components/library/UI/Input";
import { useForm } from "react-hook-form";
import { Button } from "@components/library";
import { loginVerify, sendLogin } from "@actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";
import GoogleIcon from "@assets/images/icons/google.svg";
import {
  toggleLoginModal,
  toggleRecoverModal,
  toggleSignUpModal,
} from "@actions/authModalsActions";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState({});
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const { __ } = useTranslation();

  const handleSignUpToggle = (isOpen) => {
    dispatch(toggleSignUpModal(isOpen));
  };

  const handleLoginToggle = (isOpen) => {
    dispatch(toggleLoginModal(isOpen));
  };

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  console.log(errors);

  const onSubmit = (data) => {
    setLoading(true);

    const { email, password, verification } = data;
    if (!showVerification) {
      sendLogin(email, password)
        .then((res) => {
          setLoading(false);
          setShowVerification(true);
          setMyData(res);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.message);
        });
    } else {
      dispatch(
        loginVerify({
          email,
          password,
          verification,
          hash: myData.hash,
        })
      )
        .then(() => {
          redirect("/");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(error.response.data.message);
        });
    }
  };

  const formChange = () => {
    setError("");
  };

  const checkTypeCode = useMemo(() => {
    let message = "";
    switch (myData["2fa_type"]) {
      case "app":
        message = `${__("auth.enter_google_code")}:`;
        break;
      case "sms":
        message = `${__("auth.enter_sms_code")}:`;
        break;
      default:
        message = `${__("auth.enter_email_code")}:`;
    }
    return message;
  }, [myData]);

  return (
    <>
      <Helmet>
        <title>
          {__("seo.log_in")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={formChange}
        className="auth-form"
      >
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
                  /^(([a-zA-Z0-9\-._]+)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }),
            },
            message: `${__("error.email_format")}`,
            name: "email",
          }}
        />
        <Input
          className={"auth.js-form__inp-wrap"}
          data={{
            label: `${__("common.password")}:`,
            type: isTypePassword ? "password" : "text",
            errors,
            error,
            settings: {
              ...register("password", {
                required: true,
                minLength: 8,
                // pattern:
                // /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
              }),
            },
            message: `${__("error.pass_required")}`,
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
        {showVerification && (
          <Input
            className={"auth.js-form__inp-wrap bo-input--icon"}
            data={{
              label: checkTypeCode,
              type: "text",
              placeholder: `${__("common.enter_code")}`,
              errors,
              error,
              settings: {
                ...register("verification", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  pattern: /^\d{6}$/,
                }),
              },
              message: `${__("error.invalid_code")}`,
              name: "verification",
            }}
          >
            <button
              type="button"
              className="bo-input__icon bo-input__icon--left bo-input__icon--key"
            ></button>
          </Input>
        )}

        {error && <p className="auth-form__error">{error}</p>}

        {/* <Link to="/auth/recover-password" className="auth-form__link">
          {__("auth.forgot_pass")}
        </Link> */}
        <Link
          to=""
          className="auth-form__link"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleRecoverModal(true));
          }}
        >
          {__("auth.forgot_pass")}
        </Link>
        <Button
          disabled={!isValid}
          className="auth-form__btn"
          type="submit"
          color="orange"
          size="middle"
          isLoading={loading}
        >
          {__("auth.log_in")}
        </Button>
        <div class="divider">
          <span>or</span>
        </div>
        <Button color="dark-grey" size="middle" isLoading={loading}>
          <img src={GoogleIcon} alt="" />
          {__("auth.create_with_google")}
        </Button>
      </form>
    </>
  );
};

export default Login;
