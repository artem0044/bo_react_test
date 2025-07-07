import { useEffect } from "react";
import config from "../config";

export function useTitle(title, resetOnUnmount = true) {
  useEffect(() => {
    return () => {
      if (!resetOnUnmount) return;
      document.title = config.default_title;
    };
  }, [resetOnUnmount]);

  useEffect(() => {
    console.log(document.title, title, "document.title");
    document.title = title;
  }, [title]);

  return null;
}
