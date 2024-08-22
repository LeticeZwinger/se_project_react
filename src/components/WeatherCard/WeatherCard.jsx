import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption =
    weatherOptions.find(
      (option) =>
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition,
    ) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
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
