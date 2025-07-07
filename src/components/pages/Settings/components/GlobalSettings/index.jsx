import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@components/library";
import { useForm } from "react-hook-form";

import Language from "./Language";
import Timezone from "./Timezone";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@actions/user";

import "./index.sass";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";

const GlobalSettings = () => {
  const {
    companyNews = 0,
    withdrawal = 0,
    deposit = 0,
  } = useSelector((state) => state.user.user);
  const { __ } = useTranslation();

  console.log(companyNews, withdrawal, deposit);

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      companyNews: Boolean(Number(companyNews)),
      withdrawal: Boolean(Number(withdrawal)),
      deposit: Boolean(Number(deposit)),
    },
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let { isDirty } = formState;

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    const data = {
      values: formData,
    };

    await dispatch(updateUser({ data }));

    reset(formData);
    isDirty = false;
    setLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>
          {__("seo.settings")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <form
        className="g-settings settings"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <header className="settings__header">
          <h1 className="settings__title">{__("common.settings")}</h1>
        </header>

        <Language />
        
        <Grid container>
          <Grid item xl={6} md={8} xs={12}>
            <Timezone/>
            <Notification control={control} />
          </Grid>
        </Grid>

        <Button
          disabled={!isDirty}
          className="settings__btn"
          color="orange"
          size="middle"
          type="submit"
          isLoading={loading}
        >
          {__("settings.confirm")}
        </Button>
      </form>
    </>
  );
};

export default React.memo(GlobalSettings);
