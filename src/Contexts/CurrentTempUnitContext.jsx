import React from "react";
import { useState } from "react";

export const CurrentTempUnitContext = React.createContext();

export const CurrentTempUnitProvider = ({ children }) => {
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const toConvert = (degreesF) => {
    console.log(degreesF);

    if (currentTempUnit === "F") {
      return degreesF;
    } else {
      return parseInt((degreesF - 32) * (5 / 9));
    }
  };

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange, toConvert }}
    >
      {children}
    </CurrentTempUnitContext.Provider>
  );
};
