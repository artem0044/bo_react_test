import { useTranslation } from "@helpers/translate";
import Verified from "@assets/images/icons/success.svg";
import Pending from "@assets/images/icons/pending.svg";
import Unverified from "@assets/images/icons/check.svg";

export const VerifyStatus = ({ status }) => {
  const { __ } = useTranslation();

  const statusMap = {
    4: "unverified",
    3: "pending",
    2: "verified",
    1: "unverified",
  };

  const textMap = {
    success: __("common.verified"),
    pending: __("common.pending"),
    unverified: __("common.unverified"),
    4: __("common.rejected"),
    3: __("common.pending"),
    2: __("common.verified"),
    1: __("common.unverified"),
  };

  const iconMap = {
    1: Unverified,
    2: Verified,
    3: Pending,
    4: Unverified,
  };

  return (
    <div className={`status ${statusMap[status] || statusMap.default}`}>
      <img
        className="status__icon"
        src={`${iconMap[status] || statusMap.default}`}
      />
      <p className="status__text">{textMap[status]}</p>
    </div>
  );
};

export default VerifyStatus;
