import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard(wheatherData) {
  return (
    <section className="weather-card">
      {/* <p className="weather-card__temp">{wheatherData.F} &deg; F</p> */}
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
