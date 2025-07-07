import React, { useState } from "react";
import { Grid } from "@mui/material";
import Input from "@components/library/UI/Input";
import { Button } from "@components/library";
import { useForm } from "react-hook-form";
import { changeUserNumber } from "@actions/user/changeUserPassword";
import { useDispatch } from "react-redux";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState({
    old_password: true,
    password: true,
    confirm_password: true,
  });
  const dispatch = useDispatch();
  const { __ } = useTranslation();

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setLoading(true);

    dispatch(changeUserNumber(data))
      .then(() => {
        reset();
      })
      .catch((error) => {
        const data = error?.response?.data?.errors;
        console.log(data);
        if (data) {
          Object.keys(data).forEach((error) => {
            let nameError = error;

            setError(nameError, {
              type: "custom",
              message: data[error][0],
            });
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.change_password")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>

      <div className="changePassword settings">
        <header className="settings__header">
          <h1 className="settings__title">{__("settings.change_password")}</h1>
          <p className="settings__text">
            {__("settings.change_password_text")}
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing="1rem" rowSpacing="1.25rem">
            <Grid item b680={6} xs={12}>
              <Input
                className=""
                data={{
                  label: `${__("settings.your_password")}:`,
                  type: isTypePassword.old_password ? "password" : "text",
                  placeholder: `${__("common.enter_password")}:`,
                  errors,
                  settings: {
                    ...register("old_password", {
                      required: true,
                      minLength: 8,
                    }),
                  },
                  message: `${__("error.pass_required")}`,
                  name: "old_password",
                }}
              >
                <button
                  type="button"
                  className={`bo-input__icon bo-input__icon--eye ${
                    !isTypePassword.old_password ? "open" : ""
                  }`}
                  onClick={() =>
                    setIsTypePassword((prevState) => {
                      return {
                        ...prevState,
                        old_password: !prevState.old_password,
                      };
                    })
                  }
                ></button>
              </Input>
            </Grid>
            <Grid
              item
              b680={6}
              sx={{
                display: { b680: "block", xs: "none" },
              }}
            />
            <Grid item b680={6} xs={12}>
              <Input
                className=""
                data={{
                  label: `${__("settings.new_password")}`,
                  type: isTypePassword.password ? "password" : "text",
                  placeholder: `${__("settings.new_password_enter")}`,
                  errors,
                  settings: {
                    ...register("password", {
                      required: true,
                      minLength: 8,
                    }),
                  },
                  message: `${__("error.pass_required")}`,
                  name: "password",
                }}
              >
                <button
                  type="button"
                  className={`bo-input__icon bo-input__icon--eye ${
                    !isTypePassword.password ? "open" : ""
                  }`}
                  onClick={() =>
                    setIsTypePassword((prevState) => {
                      return {
                        ...prevState,
                        password: !prevState.password,
                      };
                    })
                  }
                ></button>
              </Input>
            </Grid>
            <Grid item b680={6} xs={12}>
              <Input
                className=""
                data={{
                  label: `${__("settings.new_password_confirm")}`,
                  type: isTypePassword.confirm_password ? "password" : "text",
                  placeholder: `${__("common.enter_password")}`,
                  errors,
                  settings: {
                    ...register("confirm_password", {
                      required: true,
                      minLength: 8,
                      validate: (value) => value === getValues().password,
                    }),
                  },
                  message: `${__("error.pass_different")}`,
                  name: "confirm_password",
                }}
              >
                <button
                  type="button"
                  className={`bo-input__icon bo-input__icon--eye ${
                    !isTypePassword.confirm_password ? "open" : ""
                  }`}
                  onClick={() =>
                    setIsTypePassword((prevState) => {
                      return {
                        ...prevState,
                        confirm_password: !prevState.confirm_password,
                      };
                    })
                  }
                ></button>
              </Input>
            </Grid>
          </Grid>

          <Button
            isLoading={loading}
            className="settings__btn"
            color="orange"
            size="middle"
            type="submit"
            disabled={!isValid || Object.keys(errors).length}
          >
            {__("settings.password_confirm")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
