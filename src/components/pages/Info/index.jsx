import React, { useState, useEffect } from "react";
import EditorComponents from "@components/common/EditorComponents";
import axios from "@helpers/axios/public.axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "@helpers/translate";

import "./index.sass";

export const InfoPage = () => {
  const [data, setData] = useState(null);
  const { page } = useParams();
  const { __ } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        const resp = await axios.get(`/page/${page}`);
        setData(resp.data.data.page);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      {data?.title && (
        <Helmet>
          <title>
            {`${data.title} ${__("seo.divider")} ${__("seo.title")}`}
          </title>
        </Helmet>
      )}
      <div className="info">
        <div className="info__wrapper">
          <div className="info__container">
            {data ? (
              <>
                <h1 className="info__title">{data.title}</h1>
                <EditorComponents data={JSON.parse(data.content).blocks} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
