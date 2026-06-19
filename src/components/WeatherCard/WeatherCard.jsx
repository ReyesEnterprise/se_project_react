import "./WeatherCard.css";
import clear from "../../assets/day/clear.png";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weatherCard">
      <p className="weatherCard__temp">{weatherData.temp.F}</p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${weatherOption?.day ? "day" : "night"} time ${weatherOption?.condition} weather`}
        className="weatherCard__img"
      />
    </section>
  );
}

export default WeatherCard;
