import { useIntl } from 'react-intl';


export const useTranslation = () => {
  const intl = useIntl();
  return {
    __: ( key, default_translation = "" ) => {
      return intl.formatMessage({ id: key, defaultMessage: default_translation })
    }
  }
}