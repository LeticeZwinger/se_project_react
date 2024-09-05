import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTempUnitContext } from "../Contexts/CurrentTempUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTempUnit, toConvert } = useContext(CurrentTempUnitContext);

  const weatherOption =
    weatherOptions.find(
      (option) =>
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition,
    ) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {toConvert(weatherData.temp.F)} &deg; {currentTempUnit}
      </p>
      <img
        src={weatherOption.url}
        alt={`Card showing ${
          weatherOption === defaultWeatherOptions.day ||
          weatherOption === defaultWeatherOptions.night
            ? "default"
            : weatherOption.day
              ? "day"
              : "night"
        } time ${
          weatherOption === defaultWeatherOptions.day ||
          weatherOption === defaultWeatherOptions.night
            ? "weather"
            : weatherOption.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
