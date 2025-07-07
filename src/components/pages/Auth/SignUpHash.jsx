import React, { useEffect, useState } from "react";
import Completed from "@assets/images/icons/user-tick.svg";
import { Button } from "@components/library";
import { useDispatch } from "react-redux";
import { registrationVerify } from "@actions/auth/registrationVerify";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import { Footer } from "@components/layout/Footer";
import { HeaderUnauth } from "@components/layout/Header/HeaderUnauth";
import { useTranslation } from "@helpers/translate";
import Cookies from "js-cookie";
import { MAIN_PAGE } from "@constants";

export const SignUpHash = () => {
  const dispatch = useDispatch();
  const { hash } = useParams();
  const [loading, setLoading] = useState(true);
  const { __ } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(registrationVerify({ hash }))
      .then((data) => {
        Cookies.set("registered", data.user.id, { expires: 7 });
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDashboardClick = () => {
    navigate(MAIN_PAGE, { replace: true });
  };

  return (
    <div className={`base-wrap`}>
      <div className="base-wrap__header">
        <HeaderUnauth />
      </div>

      <div className="base-wrap__content">
        <main className="auth auth">
          <div className="auth__wrapper">
            <div className="completed">
              {loading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={80}
                    sx={{ margin: "0 auto", bgcolor: "#292929" }}
                  />
                  <Box sx={{ marginY: "10px" }}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "51px", bgcolor: "#292929" }}
                    />
                  </Box>
                  <Box sx={{ marginBottom: "24px" }}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "25px", bgcolor: "#292929" }}
                    />
                  </Box>

                  <Skeleton
                    variant="rounded"
                    width={195}
                    height={56}
                    sx={{
                      margin: "0 auto",
                      fontSize: "51px",
                      bgcolor: "#292929",
                    }}
                  />
                </>
              ) : (
                <>
                  <picture className="completed__icon">
                    <img src={Completed} alt="user tick" />
                  </picture>

                  <h1 className="completed__title">
                    {__("auth.registration_completed")}
                  </h1>

                  <p className="completed__text">
                    {__("auth.registration_completed_t")}
                  </p>

                  <Button
                    className="completed__btn"
                    size="middle"
                    type="button"
                    color="orange"
                    onClick={handleDashboardClick}
                  >
                    {__("auth.dashboard")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      <div className="base-wrap__footer">{<Footer />}</div>
    </div>
  );
};

export default SignUpHash;
