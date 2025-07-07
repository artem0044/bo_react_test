import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Status from "@components/library/UI/Status";
import { Pagination } from "@mui/material";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import {convertToUserTimezone} from "@helpers/timezone";

const Fiat = ({ operation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { __ } = useTranslation();

  const getFiatHistory = async (operation, page = "1") => {
    try {
      setLoading(true);
      const operationParam =
        operation !== "all" ? `operation=${operation}` : "";
      const resp = await axios.get(
        `/gateway/history/fiat/transactions?${operationParam}&page=${page}&paginate=10`
      );
      setData(resp.data.data);
      setLoading(false);
      setTotalPages(resp.data.pagination.total);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getFiatHistory(operation, currentPage);
  }, [operation, currentPage]);

  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 960 }} className="table">
          <div className="table__tr table__tr--head">
            <Box
              sx={{
                flex: "0 0 21%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("common.date")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 18%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("common.type")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 23.5%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("common.payment_method")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 16%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("common.amount")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 21.5%",
                textAlign: "right",
                paddingRight: "40px",
              }}
              className="table__td"
            >
              <p className="table__text">{__("common.status")}</p>
            </Box>
          </div>
          {loading ? (
            <>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
            </>
          ) : data.length ? (
            data.map((el) => (
              <div key={el.id} className="table__tr">
                <Box
                  sx={{
                    flex: "0 0 21%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{convertToUserTimezone(el.created_at, "YYYY-MM-DD HH:mm")}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 18%",
                  }}
                  className="table__td"
                >
                  <p className="table__text table__text--bg">
                    {el.operation === "deposit"
                      ? __("wallet.deposit_type")
                      : __("wallet.withdraw_type")}
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 23.5%",
                  }}
                  className="table__td"
                >
                  <p className="table__text table__text--bg">
                    {el.gateway_title}
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 16%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">${el.amount}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 21.5%",
                    textAlign: "right",
                  }}
                  className="table__td"
                >
                  <Status status={el.status} />
                </Box>
              </div>
            ))
          ) : (
            <p>{__("common.not_found")}</p>
          )}
        </Box>
      </Box>
      {totalPages !== 1 && (
        <Pagination
          className="pagination"
          count={totalPages}
          page={currentPage}
          onChange={changePage}
          variant="outlined"
          shape="rounded"
        />
      )}
    </>
  );
};

export default Fiat;
