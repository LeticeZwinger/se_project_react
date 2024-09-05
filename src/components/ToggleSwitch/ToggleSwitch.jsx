import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../Contexts/CurrentTempUnitContext";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext,
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
        checked={currentTempUnit === "C"}
      />
      <span className="switch__slider">
        <span className="switch__circle"></span>
      </span>
      <p
        className={`switch__temp-F ${currentTempUnit === "F" && "switch__active"}`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${currentTempUnit === "C" && "switch__active"}`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
