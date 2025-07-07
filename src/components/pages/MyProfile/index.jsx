import React, {useState, useEffect} from "react";
import {Grid} from "@mui/material";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {enUS, ruRU, esES} from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/es";

import {
  Button,
  VerifyStatus,
  Input, InternalContent,
} from "@components/library";
import {LeftArrowIcon, RightArrowIcon, SwitchViewButton} from "./components";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {updateUserKyc, updateVerification} from "@actions";
import CountrySelect from "./components/CountrySelect";
import {useTranslation} from "@helpers/translate";

import "./index.sass";
import {Helmet} from "react-helmet";
import OndatoPopup from "./components/OndatoPopup";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {__} = useTranslation();
  const {locale} = useSelector((state) => state.localization);
  const { theme } = useSelector((state) => state.theme);
  
  const localeText = () => {
    if (locale === "ru") {
      return ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
    } else if (locale === "es") {
      return esES.components.MuiLocalizationProvider.defaultProps.localeText;
    } else {
      return enUS.components.MuiLocalizationProvider.defaultProps.localeText;
    }
  };

  const {
    full_name = "",
    email,
    date_birth,
    country = "",
    phone,
    ondato_status = 1,
    display_id
  } = useSelector((state) => state.user.user);

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    control,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name,
      email,
      country,
      phone_number: phone,
      date_birth: date_birth ? date_birth : null,
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    const {full_name, email, country, phone_number, date_birth} = formData;
    const data = {
      email,
      phone_number: phone_number.startsWith("+")
        ? phone_number
        : "+" + phone_number,
      full_name,
      country_code: country,
      date_birth: dayjs(date_birth).format("YYYY-MM-DD"),
    };

    dispatch(updateUserKyc({data}))
      .then((data) => {
        window.open(data.url, "_blank");
      })
      .catch((error) => {
        const data = error?.response?.data?.errors;
        console.log(data);
        if (data) {
          Object.keys(data).forEach((error) => {
            let nameError = error;

            if (error === "first_name" || error === "last_name") {
              nameError = "full_name";
            }

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

  useEffect(() => {
    dispatch(updateVerification());
  }, []);

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba2${theme === "white" ? "-white" : ""}.png`}
    >
      <Helmet>
        <title>
          {__("seo.my_profile")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <OndatoPopup/>

      <div className="">
        <h1 className="profile__title">{__("profile.my_profile")} ID: {display_id}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={{lg: "24px", xs: "16px"}}>
            <Grid item lg={4} b680={6} xs={12}>
              <Input
                className="profile__inp-wrap"
                data={{
                  label: `${__("profile.full_name")}:`,
                  type: "text",
                  placeholder: `${__("profile.full_name")}:`,
                  errors,
                  settings: {
                    ...register("full_name", {
                      required: true,
                      pattern: /^[\p{L} ,.'-]+$/u,
                    }),
                  },
                  name: "full_name",
                }}
              />
            </Grid>
            <Grid item lg={4} b680={6} xs={12}>
              <Input
                className="profile__inp-wrap"
                data={{
                  label: `${__("profile.email")}:`,
                  type: "email",
                  placeholder: "qwerty@gmail.com",
                  errors,
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
            </Grid>
            <Grid item lg={4} b680={6} xs={12}>
              <CountrySelect control={control}/>
            </Grid>
            <Grid item lg={4} b680={6} xs={12}>
              <div className="bo-input">
                <label className="bo-input__label">
                  <p className="bo-input__label-text bo-input__label-text--help">
                    {__("profile.phone_number")}:{/*<Tooltip*/}
                    {/*  title="You can change the phone number in the settings"*/}
                    {/*  placement="left-start"*/}
                    {/*  className="tooltip__icon"*/}
                    {/*  slotProps={{*/}
                    {/*    tooltip: {*/}
                    {/*      className: "tooltip__popper",*/}
                    {/*    },*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <img className="profile__help" src={Help} />*/}
                    {/*</Tooltip>*/}
                  </p>
                  <div className="bo-input__wrap">
                    <Controller
                      name="phone_number"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <PhoneInput
                          value={field.value}
                          specialLabel={false}
                          placeholder="+45 (___)___-____"
                          disableDropdown
                          onChange={(e) => field.onChange(e)}
                          className={`${
                            errors["phone_number"] ? "error" : ""
                          } bo-input__input`}
                        />
                        // <InputMask
                        //   mask="+999 (999) 999-9999"
                        //   placeholder="+38 (___) ___-____"
                        //   value={field.value}
                        //   onChange={(e) => field.onChange(e.target.value)}
                        //   className={`bo-input__input`}
                        // />
                      )}
                    />

                    {errors["phone_number"] && (
                      <p className="bo-input__error">
                        {errors["phone_number"].message}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </Grid>
            <Grid item lg={4} b680={6} xs={12}>
              <div className="bo-input">
                <label className="bo-input__label">
                  <p className="bo-input__label-text">{__("profile.birth")}:</p>
                  <div className="bo-input__wrap">
                    <Controller
                      name="date_birth"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <LocalizationProvider
                          adapterLocale={locale}
                          dateAdapter={AdapterDayjs}
                        >
                          <DatePicker
                            showDaysOutsideCurrentMonth
                            fixedWeekNumber={6}
                            dayOfWeekFormatter={(day) => {
                              return day.slice(0, 2);
                            }}
                            locale={locale}
                            localeText={localeText()}
                            format="YYYY/DD/MM"
                            slotProps={{
                              popper: {
                                className: "bo-calendar-popper",
                              },
                              mobilePaper: {
                                className: "bo-calendar-popper",
                              },
                            }}
                            className="bo-calendar"
                            components={{
                              LeftArrowIcon,
                              RightArrowIcon,
                              SwitchViewButton,
                            }}
                            value={dayjs(field.value)} // Format the date manually
                            defaultValue={dayjs(field.value)}
                            onChange={(newValue) => field.onChange(newValue)}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </div>
                </label>
              </div>
            </Grid>
            <Grid item lg={4} b680={6} xs={12}>
              <div className="bo-input">
                <label className="bo-input__label">
                  <p className="bo-input__label-text">
                    {__("profile.v_status")}
                  </p>
                  <div className="bo-input__wrap">
                    <div className="verification">
                      <VerifyStatus status={ondato_status}/>
                    </div>
                  </div>
                </label>
              </div>
            </Grid>
          </Grid>

          {(ondato_status === 1 || ondato_status === 4) && (
            <Button
              className="profile__btn"
              disabled={!isValid}
              size="middle"
              type="submit"
              color="orange"
              isLoading={loading}
            >
              {__("profile.start_verification")}
            </Button>
          )}
        </form>
      </div>
    </InternalContent>
  );
};

export default MyProfile;
