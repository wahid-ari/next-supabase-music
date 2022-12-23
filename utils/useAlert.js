import { useEffect, useState } from "react";

export default function useAlert() {
  const [alert, setAlertState] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const setAlert = ({ show, message, isError }) => {
    setAlertState({
      show: typeof show !== "undefined" ? show : alert.show,
      message: typeof message !== "undefined" ? message : alert.message,
      isError: typeof isError !== "undefined" ? isError : alert.isError,
    });
  };

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlertState({ ...alert, show: false });
      }, 3000);
    }
  }, [alert]);

  return [alert, setAlert];
}
