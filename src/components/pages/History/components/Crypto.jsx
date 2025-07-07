import React, { useEffect, useState } from "react";
import { Box, Pagination, Skeleton } from "@mui/material";
import Status from "@components/library/UI/Status";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import Copy from "@assets/images/icons/copy.svg";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import {convertToUserTimezone} from "@helpers/timezone";

const Crypto = ({ operation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { __ } = useTranslation();
  const getFiatHistory = async (operation, page = "1") => {
    try {
      setLoading(true);
      console.log(operation);
      const operationParam =
        operation !== "all" ? `operation=${operation}` : "";
      const resp = await axios.get(
        `/gateway/history/crypto/transactions?${operationParam}&page=${page}&paginate=10`
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
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 1200 }} className="table">
        <div className="table__tr table__tr--head">
          <Box
            sx={{
              flex: "0 0 13%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("common.date")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 8%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("common.type")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 11%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("common.amount")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 10%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("common.network")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 10%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("common.commission")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 12%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("wallet.credited_amount")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 12%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("wallet.destination")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 12%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("wallet.status")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 12%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("wallet.hash")}</p>
          </Box>
        </div>

        {loading ? (
          <>
            {[1, 2, 3].map((item) => (
              <div key={item} className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
            ))}
          </>
        ) : data.length ? (
          <>
            {data.map((el) => (
              <div key={el.id} className="table__tr">
                <Box
                  sx={{
                    flex: "0 0 13%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{convertToUserTimezone(el.created_at, "YYYY-MM-DD HH:mm")}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 8%",
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
                    flex: "0 0 11%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">
                    {el.amount} {el.currency}
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 10%",
                  }}
                  className="table__td"
                >
                  <p className="table__text"></p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 10%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{el.fee}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 12%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">
                    {el.amount_credited} {el.currency}
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 12%",
                  }}
                  className="table__td"
                >
                  <a href="#" className="table__text  table__text--blue">
                    {el.payee_wallet}
                  </a>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 12%",
                  }}
                  className="table__td"
                >
                  <Status status={el.status} />
                </Box>
                <Box
                  sx={{
                    flex: "0 0 12%",
                  }}
                  className="table__td"
                >
                  <div className="table__wrap">
                    {el.hash && (
                      <>
                        <a
                          target="_blank"
                          href={el.invoice_link}
                          className="table__text table__text--blue"
                        >
                          {el.hash.substring(0, 12) +
                            " ..." +
                            el.hash.substring(el.hash.length - 10)}
                        </a>
                        <CopyToClipboard text={el.hash}>
                          <button type="button" className="table__copy">
                            <img src={Copy} />
                          </button>
                        </CopyToClipboard>
                      </>
                    )}
                  </div>
                </Box>
              </div>
            ))}
          </>
        ) : (
          <p>{__("common.not_found")}</p>
        )}
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
    </Box>
  );
};

export default Crypto;
