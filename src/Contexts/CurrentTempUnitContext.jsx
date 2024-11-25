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
    // console.log(
    //   "I'm not sure if the reviewer will see this, if I change the url from http://0.0.0.0:3000 to http://locahost:3000, the website does not load at all to me, the same way that http://0.0.0.0:3000 does not work for you. If you can see the page normaly with localhost we move on, if you can't than I will ask for help",
    // );
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
