import React, { useState } from "react";
import { Grid } from "@mui/material";
import Input from "../../../../library/UI/Input";
import { Button } from "@components/library";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import axios from "@helpers/axios/private.axios";
import PhoneInput from "react-phone-input-2";
import { post2FASms } from "@actions/user";
import { useTranslation } from "@helpers/translate";

const SmsAuthentication = ({ setShowWarning }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const { __ } = useTranslation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = ({ phone, code }) => {
    setLoading(true);
    if (!showVerification) {
      axios
        .post("/users/2fa/phone/init", { phone: "+" + phone })
        .then(() => {
          setShowVerification(true);
          setError("");
        })
        .catch((error) => {
          setError(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(post2FASms({ code }))
        .then(() => {
          setShowWarning(true);
        })
        .catch((error) => {
          console.log(error, "error");
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
    <form onChange={formChange} onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing="1rem" rowSpacing="1.25rem">
        <Grid item xl={6} lg={8} xs={12}>
          <div className="authentication__step authentication-step">
            <h3 className="authentication-step__title">
              {__("settings.2Step")}
            </h3>
            <p className="authentication-step__text">
              {!showVerification ? (
                __("settings.2Step_text1")
              ) : (
                <>
                  {__("settings.2Step_text2")}
                  <br />
                  +x xxx xxx xx 71.
                </>
              )}
            </p>
            <div className="authentication-step__progress">
              <Grid container spacing="1rem">
                <Grid item xs={6}>
                  <div
                    className={`authentication-step__bar ${
                      !showVerification ? "authentication-step__bar-active" : ""
                    }`}
                  ></div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={`authentication-step__bar ${
                      showVerification ? "authentication-step__bar-active" : ""
                    }`}
                  ></div>
                </Grid>
              </Grid>
            </div>
            <div className="authentication-step__inp-wrap">
              {showVerification ? (
                <>
                  <Input
                    className={"bo-input--icon"}
                    data={{
                      type: "text",
                      placeholder: "Enter code",
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
                      type="submit"
                      className="bo-input__icon bo-input__icon--left bo-input__icon--key"
                    ></button>
                  </Input>
                  <Button
                    type="submit"
                    className="authentication-step__btn"
                    color="orange"
                    size="middle"
                    isLoading={loading}
                    disabled={!isValid}
                  >
                    {__("settings.verify")}
                  </Button>
                </>
              ) : (
                <>
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
                  <Button
                    type="submit"
                    className="authentication-step__btn"
                    color="orange"
                    size="middle"
                    isLoading={loading}
                    disabled={!isValid}
                  >
                    {__("settings.submit_code")}
                  </Button>
                </>
              )}
            </div>

            {error && <p className="auth-form__error">{error}</p>}
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default SmsAuthentication;
