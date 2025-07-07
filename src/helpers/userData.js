import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@actions/user";
import { createDemoUser } from "@actions/auth";
import { removeUserSession } from "@helpers/axios/private.axios";

const UserData = () => {
  const { token, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userData = async () => {
    if (!isAuth) {
      await dispatch(createDemoUser());
    }

    dispatch(getUserData()).then((data) => {
      const { is_banned = false } = data;
      if (is_banned) {
        sessionStorage.setItem("isBanned", true);
        removeUserSession();
      }
    });
  };
  
  useEffect(() => {
    userData();
  }, [token]);

  return null;
};

export default UserData;
