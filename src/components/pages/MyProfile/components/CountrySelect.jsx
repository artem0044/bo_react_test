import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import { useSelector } from "react-redux";

const CountrySelect = ({ control }) => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const { __ } = useTranslation();
  const { locale } = useSelector((state) => state.localization);

  const getСountries = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/common/countries");

      setCountry(resp.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getСountries();
  }, []);

  return (
    <div className="bo-input">
      <label className="bo-input__label">
        <p className="bo-input__label-text">{__("profile.country")}:</p>
        <div className="bo-input__wrap">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="bo-select"
                    {...field}
                    variant="standard"
                    MenuProps={{
                      className: "bo-select-content",
                    }}
                  >
                    {loading ? (
                      <Stack spacing="6px">
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width="100%"
                          height={60}
                          className="bo-skeleton"
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width="100%"
                          height={60}
                          className="bo-skeleton"
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width="100%"
                          height={60}
                          className="bo-skeleton"
                        />
                      </Stack>
                    ) : (
                      country.map((el) => {
                        const { code, label_ru, label_en } = el;

                        const label = locale === "ru" ? label_ru : label_en;

                        return (
                          <MenuItem key={code} value={code}>
                            {label}
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
        </div>
      </label>
    </div>
  );
};

export default CountrySelect;
