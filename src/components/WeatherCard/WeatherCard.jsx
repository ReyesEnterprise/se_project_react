import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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
      <p className="weatherCard__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        °{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${weatherOption?.day ? "day" : "night"} time ${weatherOption?.condition} weather`}
        className="weatherCard__img"
      />
    </section>
  );
}

export default WeatherCard;
