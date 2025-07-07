import React, { useState } from "react";
import { Button } from "@components/library";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import axios from "@helpers/axios/private.axios";
import Input from "../../../../library/UI/Input";
import { changeUserNumber } from "@actions/user/changeUserNumber";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";

const ChangePhone = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const { __ } = useTranslation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = ({ phone, code }) => {
    setLoading(true);
    if (!showVerification) {
      axios
        .post("/users/change/phone", { phone: "+" + phone })
        .then(() => {
          setShowVerification(true);
        })
        .catch((error) => {
          setError(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(changeUserNumber({ code }))
        .then(() => {
          reset();
        })
        .catch((error) => {
          setError(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const formChange = () => {
    setError("");
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.change_phone_number")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <div className="changePhone settings">
        <header className="settings__header">
          {/*<Link to={"/"} className="settings__link">*/}
          {/*  <ArrowLeft className="settings__link-icon" />*/}
          {/*  Back*/}
          {/*</Link>*/}

          <h1 className="settings__title">{__("settings.change_number")}</h1>
          <p className="settings__text">{__("settings.change_number_text")}</p>
        </header>

        <form onChange={formChange} onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing="1rem" rowSpacing="1.25rem">
            <Grid item xl={6} md={8} xs={12}>
              <div className="bo-input">
                <label className="bo-input__label">
                  <p className="bo-input__label-text">
                    {__("settings.enter_phone")}:
                  </p>
                  <div className="bo-input__wrap">
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <PhoneInput
                          value={field.value}
                          specialLabel={false}
                          disableDropdown
                          placeholder={"+45 (___)___-____"}
                          onChange={(e) => field.onChange(e)}
                          className={`${error ? "error" : ""} bo-input__input`}
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
            </Grid>
            <Grid item xl={6} md={8} xs={12} />
            <Grid item xl={6} md={8} xs={12}>
              {showVerification && (
                <Input
                  className={"auth.js-form__inp-wrap bo-input--icon"}
                  data={{
                    label: `${__("settings.v_code")}:`,
                    type: "text",
                    placeholder: `${__("settings.v_code_enter")}`,
                    errors,
                    error,
                    settings: {
                      ...register("code", {
                        required: true,
                        minLength: 6,
                        maxLength: 6,
                        pattern: /^\d{6}$/,
                      }),
                    },
                    message: `${__("error.invalid_code")}`,
                    name: "code",
                  }}
                >
                  <button
                    type="button"
                    className="bo-input__icon bo-input__icon--left bo-input__icon--key"
                  ></button>
                </Input>
              )}
            </Grid>
          </Grid>

          {error && <p className="auth-form__error">{error}</p>}

          <Button
            type="submit"
            className="settings__btn"
            color="orange"
            size="middle"
            isLoading={loading}
            disabled={!isValid}
          >
            {__("settings.confirm")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default React.memo(ChangePhone);
