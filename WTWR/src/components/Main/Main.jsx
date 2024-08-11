import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard />
      {/* <WeatherCard WeatherData={WeatherData} />*/}
      <section className="cards">
        <p className="cards__text">
          {/* today is {weatherData.temp.F} &deg; F you may want to wear: */}
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
        {/* add the cards */}
      </section>
    </main>
  );
}
export default Main;
