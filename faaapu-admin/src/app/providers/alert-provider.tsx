'use client';

import { createContext, useContext, useState } from "react";
import Alert, { AlertData, AlertType } from "../components/alert";

const AlertContext = createContext({
  showAlert: (data: AlertData) => {},
});

export const useAlert = () => useContext(AlertContext);

export default function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertData, setAlertData] = useState<AlertData>({ text: '', type: AlertType.SUCCESS });
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (data: AlertData) => {
    setAlertData(data);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {isVisible  && <Alert alertData={alertData}></Alert>}
      {children}
    </AlertContext.Provider>
  );
}