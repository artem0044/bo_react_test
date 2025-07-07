import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { CHANEL } from "../../constants";

import config from "../../config";


export const ConnectionToSockets = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);

  useEffect(() => {
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: config.pusher_key,
      cluster: config.pusher_cluster,
      forceTLS: true,
    });

    dispatch({
      type: CHANEL.CHANGE_USER_CHANEL,
      payload: window.Echo.channel(`User.${id}`),
    });
  }, []);

  return null;
};
