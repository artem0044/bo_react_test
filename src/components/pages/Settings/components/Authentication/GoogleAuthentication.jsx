import React, { useEffect, useState } from "react";
import Apple from "@assets/images/apple.svg";
import Google from "@assets/images/google.svg";
import Qr from "@assets/images/QR.png";
import Copy from "@assets/images/icons/copy.svg";
import Info from "@assets/images/icons/info-circle.svg";
import axios from "@helpers/axios/private.axios";

import "./index.sass";
import Input from "@components/library/UI/Input";
import { Button } from "@components/library";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { post2FA } from "@actions/user";
import { useTranslation } from "@helpers/translate";

const Authentication = ({ setShowWarning }) => {
  const [data2FA, setData2FA] = useState({});
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();
  const { __ } = useTranslation();

  useEffect(() => {
    const get2Fa = async () => {
      try {
        const resp = await axios.get("/users/2fa/init");

        const { qr, secret } = resp.data.data;

        setData2FA({ qr, secret });
      } catch (e) {
        console.log(e);
      }
    };

    get2Fa();
  }, []);

  const onSubmit = async (data) => {
    try {
      await dispatch(post2FA({ data, secret }));
      setShowWarning(true);
    } catch (error) {
      console.log(error, "error");
    } finally {
      reset();
    }
  };

  const { qr, secret } = data2FA;

  return (
    <>
      <section className="g-authentication__sec step-section authentication__step">
        <header className="step-section__header">
          <div className="step-section__step">1</div>
          <h3 className="step-section__title">{__("settings.download_app")}</h3>
        </header>
        <p className="step-section__text">{__("settings.download_app_text")}</p>

        <div className="step-section__links">
          <a
            target="_blank"
            href="https://apps.apple.com/ru/app/google-authenticator/id388497605"
            className="step-section__link"
          >
            <img src={Apple} alt="app store" />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share"
            className="step-section__link"
          >
            <img src={Google} alt="google play" />
          </a>
        </div>
      </section>

      <section className="g-authentication__sec step-section">
        <header className="step-section__header">
          <div className="step-section__step">2</div>
          <h3 className="step-section__title">{__("settings.save_2fa")}</h3>
        </header>
        <p className="step-section__text">{__("settings.save_2fa_text")}</p>

        <div className="step-section__qr">
          <picture className={`step-section__qr-pic ${qr ? "" : "blur"}`}>
            {qr ? <img src={qr} /> : <img src={Qr} />}
          </picture>

          <div className="step-section__qr-wrap">
            <div className="step-section__qr-copy">
              <p className="step-section__qr-text">{secret}</p>
              <CopyToClipboard text={secret}>
                <button type="button" className="step-section__qr-btn">
                  <img src={Copy} />
                </button>
              </CopyToClipboard>
            </div>
            <div className="step-section__qr-warning">
              <img
                className="step-section__qr-w-icon"
                src={Info}
                alt="warning"
              />
              <p className="step-section__qr-w-text">
                {__("tooltip.store_safely")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit(onSubmit)} className="g-authentication__sec">
        <section className="g-authentication__sec step-section">
          <header className="step-section__header">
            <div className="step-section__step">3</div>
            <h3 className="step-section__title">
              {__("settings.confirm_2fa")}
            </h3>
          </header>

          <Input
            className={"step-section__inp-wrap"}
            data={{
              label: `${__("settings.enter_2fa_label")}`,
              type: "text",
              placeholder: `${__("settings.enter_2fa")}`,
              errors,
              settings: {
                ...register("code", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                }),
              },
              message: `${__("error.invalid_code_format")}`,
              name: "code",
            }}
          />
        </section>

        <Button
          type="submit"
          className="g-authentication__btn"
          color="orange"
          size="middle"
          disabled={!isValid}
        >
          {__("settings.enable_2fa")}
        </Button>
      </form>
    </>
  );
};

export default Authentication;
