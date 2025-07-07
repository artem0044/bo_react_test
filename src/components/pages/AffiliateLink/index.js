import React, { useEffect } from "react";
import { PreviewLoader } from "@components/library";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AUTH_SIGN_UP, MAIN_PAGE, TRY_DEMO } from "../../../constants";
import axios from "@helpers/axios/public.axios";
import { saveState } from "@helpers/storage/storeLocalData";

export const AffiliateLink = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const partnershipInit = async () => {
      try {
        const target = searchParams.get("target");

        const resp = await axios.post("/partnership-init", {
          p_hash: hash,
          target,
        });

        saveState("p_hash", hash);
        saveState("p_id", resp.data.data.id);

        if (target) {
          if (target === "register") {
            navigate(AUTH_SIGN_UP);
          }
          if (target === "site") {
            navigate(MAIN_PAGE);
          }
          if (target === "demo") {
            navigate(TRY_DEMO);
          }
        }
      } catch (e) {
        navigate(AUTH_SIGN_UP, { replace: true });
      }
    };
    partnershipInit();
  });

  return <PreviewLoader loading={true} />;
};
