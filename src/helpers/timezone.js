import moment from 'moment';

export const convertToUserTimezone = (utcTime, format = "YYYY-MM-DD HH:mm:ss") => {
  const savedTimezone = localStorage.getItem("userTimezone");
  const userTimezone = savedTimezone ? savedTimezone : moment.tz.guess();

  return moment.utc(utcTime).tz(userTimezone).format(format);
};

export const getUserTimezone = () => {
  const savedTimezone = localStorage.getItem("userTimezone");
  return savedTimezone ? savedTimezone : moment.tz.guess()
};

export const formatUTC = (timestamp, format = "YYYY-MM-DD-HH:mm") =>
  moment(timestamp * 1000).tz("UTC").format(format);

export const getAdjustedTime = (timestamp, offset, unit = "minute") =>
  moment(timestamp * 1000).tz("UTC").subtract(offset, unit).format("YYYY-MM-DD-HH:mm");